'use client';

import {
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  FilterIcon,
  GlobeIcon,
  MailIcon,
  MoonIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
  RotateCcwIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SunIcon,
  X as XIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Separator } from "../../../../components/ui/separator";
import { Switch } from "../../../../components/ui/switch";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Footer } from "../../../../components/ui/footer";
import { HeaderNav } from "../../../../components/ui/header-nav";

// Define product data for mapping
const productStats = [
  { title: "Active Products", value: "247,384", change: "+15%", trend: "up" },
  { title: "New Products", value: "+2,368", change: "+2%", trend: "up" },
  { title: "Completed Order", value: "33,847", change: "-4.5%", trend: "down" },
  { title: "Pending Payment", value: "1,284", change: "+5%", trend: "up" },
  { title: "Canceled Order", value: "836", change: "-2%", trend: "down" },
];

// Define types for API response
interface Product {
  id: number;
  name: string;
  price: number;
  productCode: string;
  barcode: string;
  stock: number;
  status: boolean;
  category: string;
  description: string;
  imageUrl: string;
}

interface ApiResponse {
  message: string;
  status: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Product[];
}

export const ProductListSection = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 20; // Items per page from API

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch products from API
  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `https://devcase.isiksoftyazilim.com/api/products?page=${page}`
      );
      setProducts(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Format price to currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Get status display value
  const getStatusDisplay = (status: boolean) => {
    return status ? "Completed" : "Pending";
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  // Mobile product card component
  const MobileProductCard = ({ product }: { product: Product }) => {
    const isSelected = selectedProducts.includes(product.id);
    
    return (
      <div className="relative flex items-center py-3 bg-white">
        <div className="flex items-center w-full">
          <Checkbox 
            className="mr-3 w-5 h-5" 
            checked={isSelected}
            onClick={() => toggleProductSelection(product.id)}
          />
          <div className="w-10 h-10 mr-3 bg-[#f5f5f5] rounded-md overflow-hidden">
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm text-[#333]">{product.name}</h3>
            <p className="text-gray-400 text-xs">{product.category}</p>
          </div>
        </div>
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4F56D3]" />
        )}
      </div>
    );
  };

  // Mobile header component for the products section
  const MobileProductsHeader = () => (
    <div className="bg-white p-4 mb-3 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold">Products</h1>
      <p className="text-sm text-gray-500">Manage your products</p>
    </div>
  );

  // Mobile stat card component
  const MobileStatCard = ({ stat }: { stat: typeof productStats[0] }) => (
    <div className="bg-white mb-3 p-4 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">{stat.title}</p>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{stat.value}</h2>
        <div className="flex items-center">
          {stat.trend === "up" ? (
            <img className="w-4 h-4 mr-1" alt="Trend up" src="/trendup.svg" />
          ) : (
            <img className="w-4 h-4 mr-1" alt="Trend down" src="/trenddown.svg" />
          )}
          <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}>
            {stat.change}
          </span>
        </div>
      </div>
    </div>
  );

  // Mobile search and actions bar
  const MobileSearchBar = () => (
    <div className="mb-4">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#333]">All Products</h2>
      </div>
      
      {showSearchInput ? (
        <div className="flex items-center mb-3 bg-white rounded-lg shadow-sm">
          <Input
            className="flex-1 border-none focus-visible:ring-0"
            placeholder="Search item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="ghost" 
            className="p-1"
            onClick={() => setShowSearchInput(false)}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex justify-center items-center h-[45px] bg-white rounded-lg shadow-sm">
            <Button 
              variant="ghost" 
              className="p-2 w-full h-full flex justify-center"
              onClick={() => setShowSearchInput(true)}
            >
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
          <div className="flex-1 flex justify-center items-center h-[45px] bg-white rounded-lg shadow-sm">
            <Button variant="ghost" className="p-2 w-full h-full flex justify-center">
              <MoreVerticalIcon className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
          <div className="flex-[3] h-[45px]">
            <Button 
              className="flex items-center justify-center gap-2 w-full h-full bg-[#4F56D3] rounded-lg"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <PlusCircleIcon className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium text-white text-sm">
                Add New Product
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile pagination component
  const MobilePagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
  }) => {
    // Generate page numbers to display
    const getPageNumbers = (): number[] => {
      const pages: number[] = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        // Show all pages if total pages is less than or equal to maxPagesToShow
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always include first page
        pages.push(1);
        
        // Calculate start and end page numbers
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust if we're near the beginning
        if (currentPage <= 3) {
          endPage = 4;
        }
        
        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
          startPage = totalPages - 3;
        }
        
        // Add pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Always include last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }
      
      return pages;
    };
    
    const pageNumbers = getPageNumbers();
    
    return (
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-2">
          Showing 1-12 from 100 data
        </div>
        <div className="flex items-center">
          {pageNumbers.map((page) => (
            <Button 
              key={page}
              variant="outline" 
              size="sm" 
              className={`w-8 h-8 p-0 rounded-md mr-1 ${
                currentPage === page 
                  ? 'bg-[#4F56D3] text-white' 
                  : 'text-gray-500'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
          {currentPage < totalPages && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-8 h-8 p-0 rounded-md text-gray-500"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className={`flex flex-col ${isMobile ? 'p-4 pb-16' : 'py-5 px-5'} flex-grow h-screen overflow-y-auto bg-[#f6f6f6]`}>
      {/* Header Card - Hide on Mobile */}
      {!isMobile && (
        <div className="mb-[30px]">
          <HeaderNav
            title="Products"
            subtitle="Manage your products"
            userName="Hakan Gök"
            userRole="Super Admin"
            notificationCount={12}
          />
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && <MobileProductsHeader />}

      {/* Stats Cards */}
      {isMobile ? (
        // Mobile Stats Cards
        <div>
          {productStats.map((stat, index) => (
            <MobileStatCard key={index} stat={stat} />
          ))}
        </div>
      ) : (
        // Desktop Stats Cards
        <div className="flex gap-[30px] w-full mb-[30px]">
          {productStats.map((stat, index) => (
            <Card
              key={index}
              className="flex-1 bg-white rounded-[10px] shadow-shadow-01"
            >
              <CardContent className="flex flex-col gap-4 p-[30px]">
                <p className="font-paragraph text-gray-4 text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
                  {stat.title}
                </p>
                <h2 className="font-heading-2 text-[#161919] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                  {stat.value}
                </h2>
                <div className="flex items-center gap-2 rounded-[90px]">
                  {stat.trend === "up" ? (
                    <img
                      className="w-[18px] h-[18px]"
                      alt="Trend up"
                      src="/trendup.svg"
                    />
                  ) : (
                    <img
                      className="w-[18px] h-[18px]"
                      alt="Trend down"
                      src="/trenddown.svg"
                    />
                  )}
                  <span
                    className={`font-heading-6 ${stat.trend === "up" ? "text-dark-green" : "text-soft-orange"} text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Mobile Search Bar */}
      {isMobile && <MobileSearchBar />}

      {/* Products Table/List */}
      {isMobile ? (
        // Mobile Product List
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <>
              <div className="divide-y divide-gray-100">
                {products.map((product) => (
                  <MobileProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <MobilePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      ) : (
        // Desktop Table View
        <Card className="bg-white rounded-xl">
          <CardContent className="flex flex-col gap-10 p-[30px]">
            {/* Table Header */}
            <div className="flex items-center justify-between w-full">
              <h3 className="font-heading-4 text-colorblack text-[length:var(--heading-4-font-size)] tracking-[var(--heading-4-letter-spacing)] leading-[var(--heading-4-line-height)] [font-style:var(--heading-4-font-style)]">
                All Products
              </h3>
              <div className="flex items-start gap-2">
                <div className="flex w-[300px] items-center gap-2 p-2.5 bg-white rounded-lg border border-solid border-[#ececeb]">
                  <SearchIcon className="w-[22px] h-[22px]" />
                  <span className="font-label text-gray-3 text-[length:var(--label-font-size)] tracking-[var(--label-letter-spacing)] leading-[var(--label-line-height)] [font-style:var(--label-font-style)]">
                    Search item...
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                    onClick={() => fetchProducts(currentPage)}
                  >
                    <RotateCcwIcon className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <CalendarIcon className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <FilterIcon className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <MoreVerticalIcon className="w-[22px] h-[22px]" />
                  </Button>
                  <Button className="flex items-center gap-[15px] px-5 py-2.5 bg-[#4F56D3] rounded-md">
                    <PlusCircleIcon className="w-[22px] h-[22px]" />
                    <span className="font-semibold text-white text-sm">
                      Add New Product
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="flex flex-col gap-5 w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-none">
                    <TableHead className="w-[278px] px-[18px]">
                      <div className="flex items-center gap-4">
                        <Checkbox className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]" />
                        <span className="font-heading-6 text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                          Product
                        </span>
                      </div>
                    </TableHead>
                    <TableHead className="w-32 font-heading-6 text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Product Code
                    </TableHead>
                    <TableHead className="w-[125px] font-heading-6 text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Category
                    </TableHead>
                    <TableHead className="w-[90px] font-heading-6 text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Price
                    </TableHead>
                    <TableHead className="w-[150px] font-heading-6 text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Status
                    </TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow
                        key={product.id}
                        className="border-t border-b border-solid border-[#ececeb] py-5"
                      >
                        <TableCell className="pl-[18px] pr-0 py-5 relative">
                          <div className="flex items-center gap-4">
                            {selectedProducts.includes(product.id) ? (
                              <img
                                className="w-[22px] h-[22px]"
                                alt="Checkbox"
                                src="/checkbox.svg"
                                onClick={() => toggleProductSelection(product.id)}
                              />
                            ) : (
                              <Checkbox 
                                className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]" 
                                onClick={() => toggleProductSelection(product.id)}
                              />
                            )}
                            <div className="w-12 h-12 bg-[#c4c4c4] rounded-lg border border-solid border-[#ececeb]">
                              {product.imageUrl && (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              )}
                            </div>
                            <div className="flex flex-col gap-2.5">
                              <h6 className="font-heading-6 text-[#161919] text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                                {product.name}
                              </h6>
                              <span className="font-label text-gray-3 text-[length:var(--label-font-size)] tracking-[var(--label-letter-spacing)] leading-[var(--label-line-height)] [font-style:var(--label-font-style)]">
                                Stock: {product.stock}
                              </span>
                            </div>
                          </div>
                          {selectedProducts.includes(product.id) && (
                            <div className="absolute w-[5px] h-[90px] top-[-21px] left-0 bg-[#4F56D3]" />
                          )}
                        </TableCell>
                        <TableCell className="font-paragraph text-[#161919] text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
                          {product.productCode}
                        </TableCell>
                        <TableCell className="font-paragraph text-gray-3 text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
                          {product.category}
                        </TableCell>
                        <TableCell className="font-heading-6 text-[#161919] text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                          {formatPrice(product.price)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`flex h-10 items-center justify-center gap-2 px-2 py-1 rounded-lg ${
                              product.status
                                ? "bg-[#88d1331a] text-dark-green"
                                : "bg-[#5151611a] text-dark-blue"
                            }`}
                          >
                            {product.status ? (
                              <CheckCircleIcon className="w-[22px] h-[22px]" />
                            ) : (
                              <ClockIcon className="w-[22px] h-[22px]" />
                            )}
                            <span className="font-label-2 text-[length:var(--label-2-font-size)] tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] [font-style:var(--label-2-font-style)]">
                              {getStatusDisplay(product.status)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="p-0">
                            <MoreHorizontalIcon className="w-8 h-8" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Footer with Pagination */}
              <Footer 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                isMobile={isMobile}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

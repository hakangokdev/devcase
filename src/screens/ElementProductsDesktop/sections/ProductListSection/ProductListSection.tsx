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
  const itemsPerPage = 12; // Items per page from API

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
      <div className="relative flex items-center py-5 bg-white border-b border-[#ECECEB]">
        <div className="flex items-center w-full px-4">
          <div className="flex items-center gap-4">
            {isSelected ? (
              <img
                className="w-[22px] h-[22px]"
                alt="Checkbox"
                src="/checkbox.svg"
                onClick={() => toggleProductSelection(product.id)}
              />
            ) : (
              <Checkbox 
                className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]" 
                checked={isSelected}
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
            <div className="flex flex-col">
              <h3 className="font-['Cairo'] font-bold text-base text-[#161919]">{product.name}</h3>
              <p className="font-['Cairo'] text-sm text-[#B2B3B9]">{product.category}</p>
            </div>
          </div>
        </div>
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4F56D3]" />
        )}
      </div>
    );
  };

  // Mobile search and actions bar
  const MobileSearchBar = () => (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex h-[43px] items-center justify-center bg-white rounded-lg border border-solid border-[#ececeb]">
        <Button variant="ghost" className="p-2.5 w-full h-full flex justify-center">
          <img src="/search-icon-title.svg" alt="Search" className="w-[22px] h-[22px]" />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center h-[43px] bg-white rounded-lg border border-solid border-[#ececeb]">
        <Button variant="ghost" className="p-2.5 w-full h-full flex justify-center">
          <img src="/dots-vertical-icon-title.svg" alt="Menu" className="w-[22px] h-[22px]" />
        </Button>
      </div>
      
      <div className="flex-[3] h-[43px]">
        <Button 
          className="flex items-center justify-center gap-2 w-full h-full bg-[#4F56D3] rounded-lg"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <PlusCircleIcon className="w-3 h-3 text-white" />
          </div>
          <span className="font-['Cairo'] font-semibold text-white text-sm">
            Add New Product
          </span>
        </Button>
      </div>
    </div>
  );

  // Mobile stat card component 
  const MobileStatCard = ({ 
    title, 
    value, 
    change, 
    trend 
  }: { 
    title: string; 
    value: string; 
    change: string; 
    trend: "up" | "down" 
  }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
      <p className="text-[#B2B3B9] text-sm mb-1">{title}</p>
      <div className="flex flex-col">
        <h2 className="font-['Cairo'] font-bold text-2xl text-[#161919]">{value}</h2>
        <div className="flex items-center mt-1">
          {trend === "up" ? (
            <img className="w-4 h-4 mr-1" alt="Trend up" src="/trendup.svg" />
          ) : (
            <img className="w-4 h-4 mr-1" alt="Trend down" src="/trenddown.svg" />
          )}
          <span className={`text-sm font-semibold ${trend === "up" ? "text-[#89D233]" : "text-[#F27277]"}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      className={`flex flex-col bg-[#f6f6f6] h-screen overflow-y-auto ${
        isMobile 
          ? 'p-4 pb-16' 
          : 'py-5 px-5 flex-grow'
      }`}
    >
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

      {/* Stats Cards */}
      {!isMobile && (
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

      {/* Products Table/List */}
      {isMobile ? (
        // Mobile Product List
        <>
          {/* Mobile Header ("Products" card) */}
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <h1 className="text-xl font-['Cairo'] font-bold text-[#161919] mb-1">Products</h1>
            <p className="text-sm text-[#B2B3B9]">Manage your products</p>
          </div>
          
          {/* Stats Cards section */}
          <div className="mb-4">
            {productStats.map((stat, index) => (
              <MobileStatCard 
                key={index}
                title={stat.title} 
                value={stat.value} 
                change={stat.change} 
                trend={stat.trend as "up" | "down"}
              />
            ))}
          </div>
          
          {/* All Products Section Wrapper */}
          <div className="bg-white rounded-lg shadow-sm mb-4"> 
            <div className="p-4 border-b border-[#ECECEB]"> {/* Header for "All Products" and search bar */}
              <h2 className="text-lg font-['Cairo'] font-bold mb-4 text-[#161919]">All Products</h2>
              <MobileSearchBar />
            </div>
            
            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <>
                <div> 
                  {products.map((product) => (
                    <MobileProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Footer with Pagination - Mobile view */}
                <div className="border-t border-[#ECECEB] p-4"> 
                  <Footer 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    isMobile={true}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        // Desktop Table View
        <Card className="bg-white rounded-xl">
          <CardContent className="flex flex-col gap-10 p-[30px]">
            {/* Table Header */}
            <div className="flex items-center justify-between w-full">
              <h3 className="font-heading-4 text-[#333333] text-xl font-bold leading-[1em]">
                All Products
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex h-[43px] w-[300px] items-center gap-2 px-2.5 bg-white rounded-lg border border-solid border-[#ececeb]">
                  <img src="/search-icon-title.svg" alt="Search" className="w-[22px] h-[22px]" />
                  <span className="font-['Cairo'] text-[#B2B3B9] text-sm leading-[1.874em]">
                    Search item...
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                    onClick={() => fetchProducts(currentPage)}
                  >
                    <img src="/refresh-icon-title.svg" alt="Refresh" className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <img src="/calendar-icon-title.svg" alt="Calendar" className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <img src="/filter-icon-title.svg" alt="Filter" className="w-[22px] h-[22px]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <img src="/dots-vertical-icon-title.svg" alt="Menu" className="w-[22px] h-[22px]" />
                  </Button>
                  <Button className="flex items-center gap-[15px] px-5 py-2.5 bg-[#4F56D3] rounded-md">
                    <img src="/plus-circle-icon-title.svg" alt="Add" className="w-[22px] h-[22px]" />
                    <span className="font-['Cairo'] font-semibold text-[#EBF3EA] text-sm leading-[1.874em]">
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
                            <div className="absolute w-[5px] h-full top-0 left-0 bg-[#4F56D3]" />
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
                              <img src="/hourglass.svg" alt="Pending" className="w-[22px] h-[22px]" />
                            )}
                            <span className="font-label-2 text-[length:var(--label-2-font-size)] tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] [font-style:var(--label-2-font-style)]">
                              {getStatusDisplay(product.status)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="p-0">
                            <img src="/dotsthreecircle.svg" alt="Menu" className="w-8 h-8" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Footer with Pagination - Desktop view */}
              {!isMobile && (
                <Footer 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
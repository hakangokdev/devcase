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
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
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
  const [isTablet, setIsTablet] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsPerPage = 12; 

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Handle scroll to show/hide footer
  useEffect(() => {
    if ((!isMobile && !isTablet) || !sectionRef.current) return;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShowFooter(scrolledToBottom);
    };
    
    const sectionElement = sectionRef.current;
    sectionElement.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile, isTablet]);

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
    if (page < 1 || page > totalPages) return;
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
  
  // Toggle select all products on current page
  const toggleSelectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
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
              <div 
                className="w-[22px] h-[22px] bg-[#4F56D3] rounded flex items-center justify-center cursor-pointer"
                onClick={() => toggleProductSelection(product.id)}
              >
                <CheckIcon className="w-[10.8px] h-[8px] text-white" />
              </div>
            ) : (
              <Checkbox 
                className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]" 
                checked={isSelected}
                onClick={() => toggleProductSelection(product.id)}
              />
            )}
            <div className="w-12 h-12 bg-gray-200 rounded-lg border border-solid border-[#ececeb] overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
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
          <SearchIcon className="w-[22px] h-[22px] text-[#515161]" />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center h-[43px] bg-white rounded-lg border border-solid border-[#ececeb]">
        <Button variant="ghost" className="p-2.5 w-full h-full flex justify-center">
          <MoreVerticalIcon className="w-[22px] h-[22px] text-[#515161]" />
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
      <p className="text-[#B2B3B9] text-sm mb-1 font-['Cairo']">{title}</p>
      <div className="flex flex-col">
        <h2 className="font-['Cairo'] font-bold text-2xl text-[#161919]">{value}</h2>
        <div className="flex items-center mt-1">
          {trend === "up" ? (
            <TrendingUpIcon className="w-4 h-4 mr-1 text-[#89D233]" />
          ) : (
            <TrendingDownIcon className="w-4 h-4 mr-1 text-[#F27277]" />
          )}
          <span className={`text-sm font-['Cairo'] font-semibold ${trend === "up" ? "text-[#89D233]" : "text-[#F27277]"}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );

  // Tablet Stats Cards component - UPDATED
  const TabletStatCards = () => (
    <div className="flex flex-col gap-3">
      {productStats.map((stat, index) => (
        <Card
          key={index}
          className="bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]" 
        >
          <CardContent className="flex flex-col gap-1 p-4"> 
            <p className="text-[#878787] text-sm font-normal font-['Cairo']"> 
              {stat.title}
            </p>
            <h2 className="text-xl font-bold text-[#161919] leading-tight font-['Cairo']"> 
              {stat.value}
            </h2>
            <div className="flex items-center gap-1.5"> 
              {stat.trend === "up" ? (
                <TrendingUpIcon className="w-4 h-4 text-[#89D233]" /> 
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-[#F27277]" /> 
              )}
              <span 
                className={`text-sm font-['Cairo'] font-medium $
                  stat.trend === "up" ? "text-[#89D233]" : "text-[#F27277]"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className={`flex flex-col bg-[#f6f6f6] h-screen overflow-y-auto ${
        isMobile 
          ? 'p-4 pb-0' 
          : isTablet
            ? 'p-5 pb-0' 
            : 'py-5 px-5 flex-grow' 
      }`}
    >
      {/* Header Card - Hide on Mobile and Tablet */}
      {!isMobile && !isTablet && (
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

      {/* Stats Cards - Desktop */}
      {!isMobile && !isTablet && (
        <div className="flex gap-[30px] w-full mb-[30px]">
          {productStats.map((stat, index) => (
            <Card
              key={index}
              className="flex-1 bg-white rounded-[10px] shadow-shadow-01"
            >
              <CardContent className="flex flex-col gap-4 p-[30px]">
                <p className="font-paragraph text-gray-4 text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)] font-['Cairo']">
                  {stat.title}
                </p>
                <h2 className="font-heading-2 text-[#161919] text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)] font-['Cairo']">
                  {stat.value}
                </h2>
                <div className="flex items-center gap-2 rounded-[90px]">
                  {stat.trend === "up" ? (
                    <TrendingUpIcon
                      className="w-[18px] h-[18px] text-dark-green"
                    />
                  ) : (
                    <TrendingDownIcon
                      className="w-[18px] h-[18px] text-soft-orange"
                    />
                  )}
                  <span
                    className={`font-heading-6 font-['Cairo'] ${stat.trend === "up" ? "text-dark-green" : "text-soft-orange"} text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Tablet Title Section */}
      {isTablet && (
        <div className="bg-white rounded-[10px] shadow-[17px_4px_34px_0px_rgba(0,0,0,0.02)] mb-[30px] px-[30px] py-5">
          <h1 className="text-2xl font-['Cairo'] font-bold text-[#202020]">Products</h1>
          <p className="text-base font-['Cairo'] text-[#878787]">Manage your products</p>
        </div>
      )}
      
      {/* Tablet Stats Cards */}
      {isTablet && (
        <div className="mb-[30px]">
          <TabletStatCards />
        </div>
      )}

      {/* Products Table/List */}
      {isMobile ? (
        // Mobile Product List
        <>
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <h1 className="text-xl font-['Cairo'] font-bold text-[#161919] mb-1">Products</h1>
            <p className="text-sm font-['Cairo'] text-[#B2B3B9]">Manage your products</p>
          </div>
          
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
          
          <div className="bg-white rounded-lg shadow-sm mb-16"> 
            <div className="p-4 border-b border-[#ECECEB]">
              <h2 className="text-lg font-['Cairo'] font-bold mb-4 text-[#161919]">All Products</h2>
              <MobileSearchBar />
            </div>
            
            {loading ? (
              <div className="text-center py-8 font-['Cairo']">Loading products...</div>
            ) : (
              <div> 
                {products.map((product) => (
                  <MobileProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          
          <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[#ECECEB] p-4 shadow-md z-10 transition-transform duration-300 ${
            showFooter ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <div className="flex justify-center mb-2">
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
            </div>
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
      ) : isTablet ? (
        <div className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] mb-16"> 
            {/* Table Toolbar */}
            <div className="flex justify-between items-center p-[30px]">
              <h2 className="text-xl font-['Cairo'] font-bold text-[#333333]">All Products</h2>
              <div className="flex items-center gap-2">
                <div className="flex h-[43px] w-[43px] items-center justify-center bg-white rounded-lg border border-solid border-[#ececeb] cursor-pointer">
                  <SearchIcon className="w-[22px] h-[22px] text-[#515161]" />
                </div>
                <div className="flex h-[43px] w-[43px] items-center justify-center bg-white rounded-lg border border-solid border-[#ececeb] cursor-pointer">
                  <MoreVerticalIcon className="w-[22px] h-[22px] text-[#515161]" />
                </div>
                <Button className="flex items-center gap-[15px] px-5 py-2.5 bg-[#4F56D3] rounded-[6px]">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <PlusCircleIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-['Cairo'] font-semibold text-white text-sm leading-[1.874em]">
                    Add New Product
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Table Content */}
            <div className="px-[30px] pb-4">
              {loading ? (
                <div className="text-center py-8 font-['Cairo']">Loading products...</div>
              ) : (
                <>
                  {/* Tablet Table Headers */}
                  <div className="flex items-center py-3 border-b border-[#F0F0F0] mb-1">
                      <div className="flex items-center gap-x-3 flex-[3] min-w-0 pr-2">
                          <Checkbox 
                            className="w-5 h-5 rounded border-gray-400"
                            checked={selectedProducts.length > 0 && selectedProducts.length === products.length}
                            onCheckedChange={toggleSelectAllProducts}
                          />
                          <span className="text-xs font-['Cairo'] font-medium text-gray-500 uppercase tracking-wider">Product</span>
                      </div>
                      <div className="flex-[2] min-w-0">
                          <span className="text-xs font-['Cairo'] font-medium text-gray-500 uppercase tracking-wider">Transaction ID</span>
                      </div>
                  </div>
                  
                  {/* Tablet Table Rows */}
                  {products.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className="flex items-center py-3.5 border-b border-[#F0F0F0] relative"
                      >
                        {/* Product Info Cell */}
                        <div className="flex items-center gap-x-3 flex-[3] min-w-0 pr-2">
                          {isSelected ? (
                            <div 
                              className="w-5 h-5 bg-[#4F56D3] rounded flex items-center justify-center cursor-pointer"
                              onClick={() => toggleProductSelection(product.id)}
                            >
                              <CheckIcon className="w-3 h-2 text-white" />
                            </div>
                          ) : (
                            <Checkbox 
                              className="w-5 h-5 rounded border-gray-400" 
                              checked={isSelected}
                              onClick={() => toggleProductSelection(product.id)}
                            />
                          )}
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300"></div> 
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-['Cairo'] font-semibold text-[#333333] truncate">{product.name}</h3>
                            <p className="text-xs font-['Cairo'] text-[#939393]">{product.category}</p>
                          </div>
                        </div>
                        
                        {/* Transaction ID Cell */}
                        <div className="flex-[2] min-w-0">
                          <span className="text-sm font-['Cairo'] text-[#5E5E5E] truncate">
                            {product.productCode}
                          </span>
                        </div>
                        
                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#4F56D3]" />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            
            {/* Footer with Pagination */}
            {!loading && products.length > 0 && (
                <div className="px-[30px] py-3 border-t border-[#F0F0F0]">
                    <Footer 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
      ) : (
        // Desktop Table View
        <Card className="bg-white rounded-xl">
          <CardContent className="flex flex-col gap-10 p-[30px]">
            {/* Table Header */}
            <div className="flex items-center justify-between w-full">
              <h3 className="font-heading-4 text-[#333333] text-xl font-['Cairo'] font-bold leading-[1em]">
                All Products
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex h-[43px] w-[300px] items-center gap-2 px-2.5 bg-white rounded-lg border border-solid border-[#ececeb]">
                  <SearchIcon className="w-[22px] h-[22px] text-[#B2B3B9]" />
                  <Input 
                    type="text" 
                    placeholder="Search item..." 
                    className="font-['Cairo'] text-[#B2B3B9] text-sm border-none focus:ring-0 focus:outline-none h-full p-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                    onClick={() => fetchProducts(currentPage)} 
                  >
                    <RotateCcwIcon className="w-[22px] h-[22px] text-[#515161]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <CalendarIcon className="w-[22px] h-[22px] text-[#515161]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <FilterIcon className="w-[22px] h-[22px] text-[#515161]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2.5 rounded-lg border-[#ececeb]"
                  >
                    <MoreVerticalIcon className="w-[22px] h-[22px] text-[#515161]" />
                  </Button>
                  <Button className="flex items-center gap-[15px] px-5 py-2.5 bg-[#4F56D3] rounded-md">
                    <PlusCircleIcon className="w-[22px] h-[22px] text-white" />
                    <span className="font-['Cairo'] font-semibold text-white text-sm leading-[1.874em]">
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
                    <TableHead className="w-[350px] px-[18px]">
                      <div className="flex items-center gap-4">
                        <Checkbox 
                            className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]"
                            checked={selectedProducts.length > 0 && selectedProducts.length === products.length}
                            onCheckedChange={toggleSelectAllProducts}
                        />
                        <span className="font-heading-6 font-['Cairo'] text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                          Product
                        </span>
                      </div>
                    </TableHead>
                    <TableHead className="w-40 font-heading-6 font-['Cairo'] text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Product Code
                    </TableHead>
                    <TableHead className="w-[150px] font-heading-6 font-['Cairo'] text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Category
                    </TableHead>
                    <TableHead className="w-[120px] font-heading-6 font-['Cairo'] text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Price
                    </TableHead>
                    <TableHead className="w-[180px] font-heading-6 font-['Cairo'] text-gray-3 text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                      Status
                    </TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 font-['Cairo']">
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => {
                      const isSelected = selectedProducts.includes(product.id);
                      return (
                        <TableRow
                          key={product.id}
                          className="border-t border-b border-solid border-[#ececeb]" 
                        >
                          <TableCell className="pl-[18px] pr-0 py-4 relative"> 
                            <div className="flex items-center gap-4">
                              {isSelected ? (
                                <div 
                                  className="w-[22px] h-[22px] bg-[#4F56D3] rounded flex items-center justify-center cursor-pointer"
                                  onClick={() => toggleProductSelection(product.id)}
                                >
                                  <CheckIcon className="w-[10.8px] h-[8px] text-white" />
                                </div>
                              ) : (
                                <Checkbox 
                                  className="w-[22px] h-[22px] rounded border border-solid border-[#b2b3b9]" 
                                  checked={isSelected}
                                  onClick={() => toggleProductSelection(product.id)}
                                />
                              )}
                              <div className="w-12 h-12 bg-gray-200 rounded-lg border border-solid border-[#ececeb] overflow-hidden">
                                {product.imageUrl ? (
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-300"></div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1"> {/* Reduced gap */}
                                <h6 className="font-heading-6 font-['Cairo'] text-[#161919] text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                                  {product.name}
                                </h6>
                                <span className="font-label font-['Cairo'] text-gray-3 text-[length:var(--label-font-size)] tracking-[var(--label-letter-spacing)] leading-[var(--label-line-height)] [font-style:var(--label-font-style)]">
                                  Stock: {product.stock}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute w-[5px] h-full top-0 left-0 bg-[#4F56D3]" />
                            )}
                          </TableCell>
                          <TableCell className="font-paragraph font-['Cairo'] text-[#161919] text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
                            {product.productCode}
                          </TableCell>
                          <TableCell className="font-paragraph font-['Cairo'] text-gray-3 text-[length:var(--paragraph-font-size)] tracking-[var(--paragraph-letter-spacing)] leading-[var(--paragraph-line-height)] [font-style:var(--paragraph-font-style)]">
                            {product.category}
                          </TableCell>
                          <TableCell className="font-heading-6 font-['Cairo'] text-[#161919] text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
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
                              <span className="font-label-2 font-['Cairo'] text-[length:var(--label-2-font-size)] tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] [font-style:var(--label-2-font-style)]">
                                {getStatusDisplay(product.status)}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="p-0">
                              <MoreHorizontalIcon className="w-8 h-8 text-[#B2B3B9]" /> 
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>

              {!loading && products.length > 0 && (
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
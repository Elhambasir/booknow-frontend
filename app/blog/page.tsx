'use client';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Calendar, User, Clock, BookOpen, TrendingUp } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Airport Guides", "Business Travel", "Travel Tips", "Corporate", "News"];

  const blogPosts = [
    {
      id: 1,
      title: "Essential Airport Transfer Tips for Business Travelers",
      excerpt: "Maximize efficiency and comfort during your airport transfers with these professional tips designed for busy executives.",
      author: "David Mitchell",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Business Travel",
      image: "/placeholder.svg",
      featured: true,
      tags: ["Airport Transfer", "Business Travel", "Tips"]
    },
    {
      id: 2,
      title: "Heathrow Airport: Complete Transfer Guide 2024",
      excerpt: "Everything you need to know about transfers to and from Heathrow Airport, including terminals, timing, and booking tips.",
      author: "Sarah Johnson",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Airport Guides",
      image: "/placeholder.svg",
      featured: false,
      tags: ["Heathrow", "Airport Guide", "Transfer"]
    },
    {
      id: 3,
      title: "Corporate Travel: Why Choose Professional Chauffeurs",
      excerpt: "The benefits of professional chauffeur services for corporate travel needs and how they enhance business productivity.",
      author: "Michael Brown",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Corporate",
      image: "/placeholder.svg",
      featured: false,
      tags: ["Corporate", "Chauffeur", "Business"]
    },
    {
      id: 4,
      title: "Gatwick vs Heathrow: Transfer Comparison Guide",
      excerpt: "Compare transfer options, costs, and convenience factors between London's two major airports.",
      author: "Emma Wilson",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Airport Guides",
      image: "/placeholder.svg",
      featured: false,
      tags: ["Gatwick", "Heathrow", "Comparison"]
    },
    {
      id: 5,
      title: "Luxury Travel: Choosing the Right Vehicle for Your Journey",
      excerpt: "A comprehensive guide to selecting the perfect luxury vehicle for your specific travel needs and preferences.",
      author: "James Taylor",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Travel Tips",
      image: "/placeholder.svg",
      featured: false,
      tags: ["Luxury", "Vehicle Selection", "Travel"]
    },
    {
      id: 6,
      title: "2024 Travel Trends: What's New in Airport Transfers",
      excerpt: "Discover the latest trends and innovations in airport transfer services for the modern traveler.",
      author: "Rachel Green",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "News",
      image: "/placeholder.svg",
      featured: false,
      tags: ["Trends", "Innovation", "2024"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
              <BookOpen className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Travel Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Travel</span>{" "}
              <span className="text-secondary">Blog</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights, travel tips, and industry updates from our professional team. 
              Stay informed about the latest in premium transportation services.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Featured Article</h2>
            </div>
            
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 lg:p-8 flex flex-col justify-center space-y-4 lg:space-y-6">
                  <div className="space-y-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button variant="hero" size="lg">
                      Read Full Article
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">
              {searchTerm ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center space-y-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold text-primary">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                    <div className="space-y-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${post.id}`} className="block">
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 lg:space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary">Stay Updated</h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            Subscribe to our newsletter for the latest travel insights and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button variant="hero" className="whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
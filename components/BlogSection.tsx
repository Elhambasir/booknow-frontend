import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Ultimate Guide to Heathrow Airport Terminals",
      excerpt: "Everything you need to know about navigating Heathrow's terminals, from arrival to baggage claim and meeting points.",
      category: "Travel Guide",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
      featured: true,
    },
    {
      id: 2,
      title: "5 Tips for Stress-Free Airport Transfers",
      excerpt: "Make your airport journey smooth and comfortable with these expert tips from our professional chauffeurs.",
      category: "Travel Tips",
      date: "2024-01-10",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
      featured: false,
    },
    {
      id: 3,
      title: "Business Travel Etiquette in the UK",
      excerpt: "Professional guidelines for business travelers using premium transport services in the United Kingdom.",
      category: "Business",
      date: "2024-01-08",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      featured: false,
    },
    {
      id: 4,
      title: "London's Best Tourist Destinations",
      excerpt: "Discover the must-visit attractions in London and how to travel between them efficiently with our premium service.",
      category: "Tourism",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      featured: false,
    },
    {
      id: 5,
      title: "Airport Security Updates 2024",
      excerpt: "Latest security procedures and guidelines for UK airports to help you prepare for your journey.",
      category: "News",
      date: "2024-01-03",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1559268950-2d7ceb2efa18",
      featured: false,
    },
    {
      id: 6,
      title: "Sustainable Travel: Our Green Initiative",
      excerpt: "Learn about our commitment to environmental sustainability and eco-friendly transportation solutions.",
      category: "Sustainability",
      date: "2024-01-01",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      featured: false,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Blogs & News
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest travel tips, airport news, and insights 
            from our team of professional chauffeurs and travel experts.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 border-0 shadow-2xl overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-secondary text-primary">
                  Featured
                </Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="hero" className="w-fit">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-background/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-background/90 text-primary">
                  {post.category}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-muted/50 border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-primary mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Get the latest travel tips, airport news, and exclusive offers delivered to your inbox.
              </p>
              <Link href="/blog">
                <Button variant="hero">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
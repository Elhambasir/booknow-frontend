'use client';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react";

const BlogDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Mock blog data - in real app, fetch based on ID
  const post = {
    id: 1,
    title: "Essential Airport Transfer Tips for Business Travelers",
    excerpt: "Maximize efficiency and comfort during your airport transfers with these professional tips.",
    content: `
      <p>Business travel can be demanding, and the journey to and from the airport shouldn't add to your stress. Here are essential tips to ensure your airport transfers are smooth, efficient, and professional.</p>
      
      <h2>1. Book in Advance</h2>
      <p>Advance booking guarantees vehicle availability and often better rates. Business travelers benefit from:</p>
      <ul>
        <li>Guaranteed pickup times</li>
        <li>Vehicle selection options</li>
        <li>Meet and greet services</li>
        <li>Fixed pricing regardless of traffic delays</li>
      </ul>
      
      <h2>2. Choose the Right Vehicle</h2>
      <p>Your choice of vehicle should match your business needs:</p>
      <ul>
        <li><strong>Executive Sedan:</strong> Perfect for solo travelers or small groups</li>
        <li><strong>Luxury SUV:</strong> Ideal for families or larger luggage requirements</li>
        <li><strong>Executive Van:</strong> Best for group travel or corporate events</li>
      </ul>
      
      <h2>3. Communication is Key</h2>
      <p>Keep your chauffeur informed about any changes:</p>
      <ul>
        <li>Flight delays or early arrivals</li>
        <li>Terminal changes</li>
        <li>Additional stops required</li>
        <li>Special requirements (child seats, accessibility needs)</li>
      </ul>
      
      <h2>4. Prepare for Your Journey</h2>
      <p>Make the most of your transfer time:</p>
      <ul>
        <li>Use Wi-Fi for last-minute preparations</li>
        <li>Review meeting notes or presentations</li>
        <li>Make important calls in a quiet environment</li>
        <li>Relax and arrive refreshed</li>
      </ul>
      
      <h2>5. Airport Etiquette</h2>
      <p>Professional airport transfer etiquette includes:</p>
      <ul>
        <li>Being ready at the designated pickup time</li>
        <li>Having contact numbers easily accessible</li>
        <li>Confirming pickup details 24 hours in advance</li>
        <li>Respecting your chauffeur's professionalism</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Professional airport transfers are an investment in your business success. They provide reliability, comfort, and peace of mind, allowing you to focus on what matters most - your business objectives.</p>
    `,
    author: "David Mitchell",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Business Travel",
    image: "/placeholder.svg",
    tags: ["Airport Transfer", "Business Travel", "Tips", "Professional"]
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Heathrow Airport: Complete Transfer Guide",
      excerpt: "Everything you need to know about transfers to and from Heathrow Airport.",
      image: "/placeholder.svg",
      category: "Airport Guide",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Corporate Travel: Why Choose Professional Chauffeurs",
      excerpt: "The benefits of professional chauffeur services for corporate travel needs.",
      image: "/placeholder.svg",
      category: "Corporate",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="space-y-4">
            <Badge variant="secondary">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-8">
              {/* Featured Image */}
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-8 border-t">
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center justify-between pt-6 border-t">
                <p className="text-sm text-muted-foreground">Share this article</p>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:space-y-8">
              {/* Author Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto"></div>
                  <div>
                    <h3 className="font-semibold text-lg">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">Travel Industry Expert</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional travel consultant with over 10 years of experience in premium transportation services.
                  </p>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Related Articles
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.id}`}
                        className="block group"
                      >
                        <div className="space-y-2">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {relatedPost.excerpt}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {relatedPost.readTime}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Navbar from "@/components/layout/Navbar"

const Blog = () => {
  const blogPosts = [
    {
      title: "10 Best Destinations for Group Travel in India",
      excerpt: "Discover the most exciting destinations perfect for group adventures, from hill stations to beach destinations.",
      category: "Travel Tips",
      author: "Sanchaari Team",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      title: "How to Split Travel Costs Fairly in Your Group",
      excerpt: "Learn the best practices for managing group expenses and keeping everyone happy during your trip.",
      category: "Planning",
      author: "Priya Sharma",
      date: "Dec 12, 2024",
      readTime: "4 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Group Travel Etiquette: Do's and Don'ts",
      excerpt: "Essential guidelines for maintaining harmony and creating memorable experiences when traveling with groups.",
      category: "Tips & Tricks",
      author: "Rahul Patel",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Planning the Perfect Goa Trip for 8 Friends",
      excerpt: "A complete guide to organizing an unforgettable group trip to India's most popular beach destination.",
      category: "Destination Guide",
      author: "Sanchaari Team",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Budget Travel: Making Group Trips Affordable",
      excerpt: "Smart strategies to reduce costs without compromising on fun during your group adventures.",
      category: "Budget Travel",
      author: "Anita Desai",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Digital Detox: Unplugged Group Travel Experiences",
      excerpt: "How to plan meaningful group trips that focus on real connections and experiences over technology.",
      category: "Wellness",
      author: "Vikram Singh",
      date: "Dec 3, 2024",
      readTime: "4 min read",
      image: "/placeholder.svg"
    }
  ]

  const categories = ["All", "Travel Tips", "Planning", "Destination Guide", "Budget Travel", "Wellness"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Travel Stories & Tips
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover inspiring stories, practical tips, and expert advice for planning amazing group adventures.
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="px-4 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Badge key={index} variant={index === 0 ? "default" : "outline"} className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] bg-muted"></div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <Button className="w-fit">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[4/3] bg-muted"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="line-clamp-2 leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Blog
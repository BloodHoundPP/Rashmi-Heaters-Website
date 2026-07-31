import { useParams, Link } from "react-router";
import { ArrowLeft, Download, CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useCategoryBySlug, useSubcategoriesWithCounts } from "../lib/useCategories";

export function ProductDetail() {
  const { id } = useParams();
  const { category, loading } = useCategoryBySlug(id);
  const { subcategories, loading: loadingSubcategories } = useSubcategoriesWithCounts(id);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading product details…</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft size={18} className="mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const description = category.description || category.short_description || category.shortDescription || "Explore this heating solution designed for demanding industrial applications.";
  const featureList = Array.isArray(category.features) ? category.features : [];
  const specificationRows = Array.isArray(category.specifications) && category.specifications.length > 0
    ? category.specifications
    : (Array.isArray(category.specs) ? category.specs.map((value: string) => ({ label: "Specification", value })) : []);
  const applicationList = Array.isArray(category.applications) ? category.applications : [];

  return (
    <div className="min-h-screen pt-40">
      <section className="bg-card/50 py-6 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <ImageWithFallback
                src={category.image || category.image_url}
                alt={category.name}
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {category.category || category.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {category.name}
              </h1>

              <p className="text-lg text-muted-foreground">
                {description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg">
                    <Mail className="mr-2" size={18} />
                    Request Quote
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  <Download className="mr-2" size={18} />
                  Download Catalog
                </Button>
              </div>

              {featureList.length > 0 && (
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {featureList.map((feature: string, index: number) => (
                        <div key={`${feature}-${index}`} className="flex items-center gap-2">
                          <CheckCircle2 className="text-primary flex-shrink-0" size={18} />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className={`grid gap-8 mb-16 ${applicationList.length > 7 ? "lg:grid-cols-[1fr_2fr]" : "lg:grid-cols-2"}`}>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Technical Specifications</h2>
              {specificationRows.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-4 font-semibold text-foreground bg-secondary/50">Parameter</th>
                            <th className="text-left p-4 font-semibold text-foreground bg-secondary/50">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specificationRows.map((spec: any, index: number) => (
                            <tr key={`${spec.label || "spec"}-${index}`} className="border-b border-border last:border-0">
                              <td className="p-4 text-muted-foreground">{spec.label || "Specification"}</td>
                              <td className="p-4 text-foreground font-medium">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-muted-foreground">Specification details will appear here once added in the admin panel.</p>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Applications</h2>
              {applicationList.length > 0 ? (
                <div className={`grid gap-4 ${applicationList.length > 7 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                  {applicationList.map((application: string, index: number) => (
                    <Card key={`${application}-${index}`} className="hover:border-primary transition-colors">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-foreground text-sm">{application}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Application details will be added soon.</p>
              )}
            </div>
          </div>

          {subcategories.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Explore Related Options</h2>
              <p className="text-muted-foreground mb-8">
                Browse the sub-categories available for this product family.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingSubcategories ? (
                  <p className="text-muted-foreground col-span-full">Loading related options…</p>
                ) : (
                  subcategories.map((subcategory: any) => (
                    <Link key={subcategory.slug} to={`/products/${id}/${subcategory.slug}`}>
                      <Card className="group overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full">
                        <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-secondary dark:to-blue-950/20 flex items-center justify-center p-4">
                          <ImageWithFallback
                            src={subcategory.image_url}
                            alt={subcategory.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-2">{subcategory.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{subcategory.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary font-medium">{subcategory.productCount ?? 0} Products</span>
                            <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" size={16} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Product Inquiry</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about this product? Fill out the form below and our team will get back to you.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 12345 67890" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your requirements..."
                    rows={5}
                    required
                  />
                </div>

                <Button size="lg" type="submit">
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
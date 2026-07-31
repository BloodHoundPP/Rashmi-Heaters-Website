import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Download, Zap, ShieldAlert, SlidersHorizontal, AlertTriangle, ToggleLeft, Gauge } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCategories, useSubcategoriesWithCounts } from "../lib/useCategories";

export function Products() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState("all");

  const { categories: productsData, loading: loadingCategories } = useCategories();
  const { subcategories: customizedHeaterCategories, loading: loadingSubcategories } =
    useSubcategoriesWithCounts("customized-heaters");

  const filteredProducts = productsData.filter((product) => {
    if (selectedType !== "all" && product.type !== selectedType) return false;
    if (selectedApplication !== "all" && product.application !== selectedApplication) return false;
    return true;
  });

  const showCustomizedCategories = selectedType === "customized";
  const displayCount = showCustomizedCategories ? customizedHeaterCategories.length : filteredProducts.length;

  if (loadingCategories) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading products…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive range of industrial heating solutions engineered for precision, durability, and optimal performance across diverse applications.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pb-8 lg:pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Product Categories</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Products" },
                    { value: "customized", label: "Customized Heaters" },
                    { value: "cartridge", label: "Cartridge Heaters" },
                    { value: "open-wire", label: "Open Wire" },
                    { value: "control-panel", label: "Control Panel" },
                    { value: "d-type", label: "D-type Heaters" },
                    { value: "standard", label: "Standard Heaters" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedType(option.value)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedType === option.value
                          ? "bg-primary text-white"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Industries</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Industries" },
                    { value: "plastic-rubber", label: "Plastic & Rubber" },
                    { value: "pharmaceutical", label: "Pharmaceutical" },
                    { value: "thermal-power", label: "Thermal Power Station" },
                    { value: "automobile", label: "Automobile" },
                    { value: "food-processing", label: "Food Processing" },
                    { value: "aerospace", label: "Aero Space" },
                    { value: "steel", label: "Steel Industry" },
                    { value: "petrochemical", label: "Petrochemical" },
                    { value: "gas", label: "Gas Industry" },
                    { value: "chemical", label: "Chemical Industry" },
                    { value: "hvac", label: "HVAC" },
                    { value: "defence", label: "Defence" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedApplication(option.value)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                        selectedApplication === option.value
                          ? "bg-primary text-white"
                          : "bg-secondary/50 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Products Grid */}
            <div>
              {/* Control Panel Info Banner */}
              {selectedType === "control-panel" && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-border">
                  <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <SlidersHorizontal size={22} className="text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Control Panel</h2>
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed max-w-3xl">
                      The performance of electric heaters heavily relies on a well-designed control panel. To meet the demands of complex and stringent process control requirements, Rashmi Heaters continuously develops control panel designs that enhance performance and safety features. Typically, all process heaters are paired with a <strong className="text-white">Thyristor (SCR) control panel</strong>. For more convenient and effective control, high-power heaters are divided into multiple smaller banks.
                    </p>
                  </div>
                  <div className="bg-card px-8 py-6">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-5">Features of Standard Control Panel</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { icon: Zap, title: "Panel Indication Lamps", desc: "Power ON/OFF, Heater ON/OFF, Element over temperature, Tube sheet over temperature (ATEX heaters), and Panel over temperature." },
                        { icon: ShieldAlert, title: "Earth Leakage Protection", desc: "Earth leakage indication and relay for personnel and equipment safety." },
                        { icon: Gauge, title: "Current & Voltage Indicators", desc: "Real-time monitoring of electrical parameters for accurate process control." },
                        { icon: AlertTriangle, title: "Annunciator", desc: "Dedicated fault indication annunciator for quick diagnosis and response to process alarms." },
                        { icon: ToggleLeft, title: "Operator Controls", desc: "Heater ON/OFF, Local/Remote, Trip Reset, door-mounted potentiometer, Lamp test, and Earth leakage reset." },
                        { icon: ShieldAlert, title: "Emergency Shutdown", desc: "Dedicated emergency shut-down control ensuring safe and immediate isolation of the heater system." },
                      ].map((feature) => (
                        <div key={feature.title} className="flex gap-3 bg-background border border-border rounded-xl p-4 hover:border-primary/40 transition-colors">
                          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <feature.icon size={17} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm mb-1">{feature.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {displayCount} product{displayCount !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showCustomizedCategories ? (
                  loadingSubcategories ? (
                    <p className="text-muted-foreground col-span-full">Loading categories…</p>
                  ) : (
                    customizedHeaterCategories.map((category) => (
                      <Card
                        key={category.slug}
                        className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-secondary">
                          <ImageWithFallback
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-3">
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {category.productCount} Models
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

                          <div className="flex gap-3">
                            <Link to={`/products/customized-heaters/${category.slug}`} className="flex-1">
                              <Button variant="default" className="w-full">
                                View Details
                                <ArrowRight className="ml-2" size={16} />
                              </Button>
                            </Link>
                            <Button variant="outline" size="icon">
                              <Download size={18} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )
                ) : (
                  filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-secondary">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {product.wattage}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{product.shortDescription}</p>

                        <div className="space-y-2 mb-6">
                          {product.specs.map((spec: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                              <span className="text-sm text-muted-foreground">{spec}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Link to={`/products/${product.id}`} className="flex-1">
                            <Button variant="default" className="w-full">
                              View Details
                              <ArrowRight className="ml-2" size={16} />
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Download size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50 border-t border-border">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We specialize in custom heating solutions. Contact our engineering team to discuss your specific requirements.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Request Custom Solution
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
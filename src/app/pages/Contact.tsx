import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

/*
 * ── EmailJS Setup ──────────────────────────────────────────────
 * 1. Sign up free at https://www.emailjs.com
 * 2. Add an Email Service (Gmail / Outlook / SMTP) → copy Service ID
 * 3. Create an Email Template with these variables:
 *      {{from_name}}, {{from_email}}, {{phone}}, {{company}},
 *      {{subject}}, {{message}}
 *    Set "To Email" = sales@rashmiheaters.com in the template.
 * 4. Copy your Public Key from Account → API Keys
 * 5. Replace the three placeholder strings below.
 * ────────────────────────────────────────────────────────────────
 */
const EMAILJS_SERVICE_ID  = "service_y02i4qd";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_9pvjjui";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "W6uLZ6Dzltf3TPCWg";   // e.g. "abcDEF_ghiJKL"

const WHATSAPP_NUMBER = "919822946344";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const emptyForm: FormData = {
  name: "", email: "", company: "", phone: "", subject: "", message: ""
};

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Gat No 118/1, Alandi Markal Road, Dhanorie, Taluka Khed, Dhanorie, Pune, Dhanore, Maharashtra 412105"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9822946344", "+91 9822910124"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["sales@rashmiheaters.com", "marketing_design@rashmiheaters.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const buildWhatsAppText = (f: FormData) =>
    `*New Inquiry – Rashmi Heaters Website*\n\n` +
    `*Name:* ${f.name}\n` +
    `*Email:* ${f.email}\n` +
    `*Phone:* ${f.phone}\n` +
    `*Company:* ${f.company || "—"}\n` +
    `*Subject:* ${f.subject}\n\n` +
    `*Message:*\n${f.message}`;

  const sendWhatsApp = (f: FormData) => {
    const text = encodeURIComponent(buildWhatsAppText(f));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      phone:      form.phone,
      company:    form.company || "Not provided",
      subject:    form.subject,
      message:    form.message,
      to_email:   "sales@rashmiheaters.com",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      sendWhatsApp(form);
      setForm(emptyForm);
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      setErrorMsg("Email delivery failed. Please try WhatsApp or call us directly.");
      setStatus("error");
      // Still open WhatsApp even if email fails
      sendWhatsApp(form);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-background py-20 border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question about our products or need a custom heating solution? Our team of experts is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-border hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <info.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form — we'll email you back within 24 hours and also notify our team instantly on WhatsApp.
                </p>

                {/* Success state */}
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={36} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-xs">
                      Your inquiry has been sent to <strong>sales@rashmiheaters.com</strong> and our team has been notified on WhatsApp. We'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input id="name" placeholder="Your name" required value={form.name} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Company name" value={form.company} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" type="tel" placeholder="+91 12345 67890" required value={form.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" placeholder="How can we help you?" required value={form.subject} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        rows={6}
                        required
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Error message */}
                    {status === "error" && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                        {errorMsg}
                      </div>
                    )}

                    {/* What happens on submit — info strip */}
                    <div className="flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3 text-xs text-muted-foreground">
                      <Mail size={14} className="text-primary shrink-0" />
                      <span>Email sent to <strong className="text-foreground">sales@rashmiheaters.com</strong></span>
                      <span className="text-border">·</span>
                      <FaWhatsapp className="text-green-500 shrink-0" size={14} />
                      <span>WhatsApp alert to our team</span>
                    </div>

                    <Button size="lg" type="submit" className="w-full" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-secondary rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.927105552671!2d73.92197597496667!3d18.667266782454988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cad54a0b90ef%3A0xacb14f2bc177892e!2sRashmi%20Heaters%20Private%20Limited!5e0!3m2!1sen!2sin!4v1776077001094!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Rashmi Heaters Location"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="bg-gradient-to-br from-primary to-accent text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                  <p className="mb-6 text-white/90">
                    Our sales team is available to answer your questions and provide expert guidance.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="tel:+919822946344"
                      className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Call Now</div>
                        <div className="font-semibold">+91 9822946344</div>
                      </div>
                    </a>
                    <a
                      href="mailto:sales@rashmiheaters.com"
                      className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Email Us</div>
                        <div className="font-semibold">sales@rashmiheaters.com</div>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <FaWhatsapp size={20} />
                      </div>
                      <div>
                        <div className="text-sm opacity-90">WhatsApp</div>
                        <div className="font-semibold">+91 9822946344</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Common Questions</h3>
                  <ul className="space-y-3">
                    {[
                      "What is the lead time for custom orders?",
                      "Do you ship internationally?",
                      "What warranty do you provide?",
                      "Can I visit your factory?",
                      "Do you provide technical support?",
                    ].map((q) => (
                      <li key={q}>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">{q}</a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

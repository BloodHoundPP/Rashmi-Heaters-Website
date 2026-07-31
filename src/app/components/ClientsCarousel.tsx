import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

import aquatechImg from "../../imports/Rashmi heaters Clients/Aquatech.jpg";
import atlasCorpoImg from "../../imports/Rashmi heaters Clients/Atlas Corpo.jpg";
import bajajAutoImg from "../../imports/Rashmi heaters Clients/Bajaj Auto.jpg";
import bhelImg from "../../imports/Rashmi heaters Clients/BHEL.jpg";
import bhushanSteelImg from "../../imports/Rashmi heaters Clients/Bhushan Steel Limited.jpg";
import cromptionImg from "../../imports/Rashmi heaters Clients/Cromption Greaves.jpg";
import forbesMarshallImg from "../../imports/Rashmi heaters Clients/forbes Marshall.jpg";
import gujaratFluoroImg from "../../imports/Rashmi heaters Clients/Gujrat Flurochemical limited.jpg";
import hindujaImg from "../../imports/Rashmi heaters Clients/Hinduja Foundries.jpg";
import jindalImg from "../../imports/Rashmi heaters Clients/Jindal Steel and Power.jpg";
import mflImg from "../../imports/Rashmi heaters Clients/MFL.jpg";
import ntpcImg from "../../imports/Rashmi heaters Clients/NTPC.jpg";
import olonSpaImg from "../../imports/Rashmi heaters Clients/Olon Spa.jpg";
import ranbaxyImg from "../../imports/Rashmi heaters Clients/Ranbaxy.jpg";
import relianceImg from "../../imports/Rashmi heaters Clients/Reliance.jpg";
import sajjanImg from "../../imports/Rashmi heaters Clients/Sajjan India Limited.jpg";
import siemensImg from "../../imports/Rashmi heaters Clients/SIEMENS.jpg";
import skfImg from "../../imports/Rashmi heaters Clients/SKF.jpg";
import tataImg from "../../imports/Rashmi heaters Clients/Tata.jpg";
import thermaxImg from "../../imports/Rashmi heaters Clients/Thermax.jpg";
import voltasImg from "../../imports/Rashmi heaters Clients/Voltas limited.jpg";

// ── newly added ──────────────────────────────────────────────────────────────
import adityaBirlaImg from "../../imports/Rashmi heaters Clients/Aditya Birla.jpg";
import airpacImg from "../../imports/Rashmi heaters Clients/airpac.jpg";
import akshImg from "../../imports/Rashmi heaters Clients/Aksh.jpg";
import cpgImg from "../../imports/Rashmi heaters Clients/CPG.jpg";
import essarImg from "../../imports/Rashmi heaters Clients/Essar.jpg";
import hemrajIndiaImg from "../../imports/Rashmi heaters Clients/Hemraj India.jpg";
import hiraImg from "../../imports/Rashmi heaters Clients/Hira.jpg";
import iffcoImg from "../../imports/Rashmi heaters Clients/IFFCO.jpg";
import iprImg from "../../imports/Rashmi heaters Clients/IPR.jpg";
import lntImg from "../../imports/Rashmi heaters Clients/L&T.jpg";
import nagarjunaImg from "../../imports/Rashmi heaters Clients/Nagarjuna.jpg";
import npcilImg from "../../imports/Rashmi heaters Clients/NPCIL.jpg";
import opalImg from "../../imports/Rashmi heaters Clients/OPAL.jpg";
import shreeCementsImg from "../../imports/Rashmi heaters Clients/Shree Cements.jpg";
import meEnergy from "../../imports/Rashmi heaters Clients/me energy.jpg";
import killBurnImg from "../../imports/Rashmi heaters Clients/kilburn.png";
import xytelImg from "../../imports/Rashmi heaters Clients/xytel_india_logo.jpg";
import texolImg from "../../imports/Rashmi heaters Clients/texol_engineering_pvt_ltd.jpg";
const clients = [
  { name: "Aditya Birla", logo: adityaBirlaImg },
  { name: "Airpac", logo: airpacImg },
  { name: "Aksh", logo: akshImg },
  { name: "Aquatech", logo: aquatechImg },
  { name: "Atlas Copco", logo: atlasCorpoImg },
  { name: "Bajaj Auto", logo: bajajAutoImg },
  { name: "BHEL", logo: bhelImg },
  { name: "Bhushan Steel Limited", logo: bhushanSteelImg },
  { name: "CPG", logo: cpgImg },
  { name: "Crompton Greaves", logo: cromptionImg },
  { name: "Essar", logo: essarImg },
  { name: "Forbes Marshall", logo: forbesMarshallImg },
  { name: "Gujarat Fluorochemicals", logo: gujaratFluoroImg },
  { name: "Hemraj India", logo: hemrajIndiaImg },
  { name: "Hinduja Foundries", logo: hindujaImg },
  { name: "Hira", logo: hiraImg },
  { name: "IFFCO", logo: iffcoImg },
  { name: "IPR", logo: iprImg },
  { name: "Jindal Steel & Power", logo: jindalImg },
  { name: "L&T", logo: lntImg },
  { name: "MFL", logo: mflImg },
  { name: "Nagarjuna", logo: nagarjunaImg },
  { name: "NPCIL", logo: npcilImg },
  { name: "NTPC", logo: ntpcImg },
  { name: "Olon Spa", logo: olonSpaImg },
  { name: "OPAL", logo: opalImg },
  { name: "Ranbaxy", logo: ranbaxyImg },
  { name: "Reliance", logo: relianceImg },
  { name: "Sajjan India Limited", logo: sajjanImg },
  { name: "Shree Cements", logo: shreeCementsImg },
  { name: "Siemens", logo: siemensImg },
  { name: "SKF", logo: skfImg },
  { name: "Tata", logo: tataImg },
  { name: "Thermax", logo: thermaxImg },
  { name: "Voltas Limited", logo: voltasImg },
  { name: "ME Energy PVT LTD", logo: meEnergy },
  { name: "Kilburn Engineering", logo: killBurnImg },
  { name: "Xytel", logo: xytelImg },
  { name: "Texol", logo: texolImg },
];

export function ClientsCarousel() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-secondary/20" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-[1320px] mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="text-primary" size={18} />
            <span className="text-sm text-primary font-semibold">
              Trusted Partners
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powering India's Industrial Giants
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Delivering excellence to leading companies across
            diverse industries
          </motion.p>
        </div>


        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative mb-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-[1px] rounded-2xl">
            <div className="bg-background rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "5000+", label: "Happy Clients" },
                  { value: "35+", label: "Years Experience" },
                  {
                    value: "100K+",
                    label: "Products Delivered",
                  },
                  {
                    value: "100%",
                    label: "Client Satisfaction",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center group"
                  >
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 4-col grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
              }}
              className="group"
            >
              <div className="relative bg-white border border-zinc-200 rounded-2xl p-4 h-35 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={client.logo}
                  alt={client.name}
                  className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* <p className="text-center text-xs text-muted-foreground mt-2 truncate px-1">
                {client.name}
              </p> */}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        
      </div>
    </section>
  );
}
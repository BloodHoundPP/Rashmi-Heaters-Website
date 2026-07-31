// Generic heater images
import customizedHeater from "../../imports/Customized_heater.png";
import controlPanel     from "../../imports/Untitled_design__22_.png";
import dTypeHeater      from "../../imports/d-type.png";
import openWire         from "../../imports/open_wire.png";
import standardHeater   from "../../imports/Standard_heater.png";
import cartridgeHeater  from "../../imports/cartraige.png";

// Category-specific images
import oilHeater      from "../../imports/oilheater.png";
import espHeater      from "../../imports/ESP.png";
import waterHeater    from "../../imports/Water Heater.png";
import chemicalHeater from "../../imports/chemical heater.png";
import spaceHeaterImg from "../../imports/air-heater-flame-proof-enclosure.png";

// Air heater images
import wireAnnealingHeater    from "../../imports/wire-annealing-enamelling-heater.png";
import atmosHeater from "../../imports/Atmos Testing Heater.png";
import inlineHotAirGenerator  from "../../imports/inline-hot-air-generator-housing.png";
import airHeaterBankSprayDryer from "../../imports/air-heater-bank-spray-dryer.png";
import finnedHeaterHVAC       from "../../imports/finned-heater-hvac-pharma.png";
import airHeaterFlameProof    from "../../imports/air-heater-flame-proof-enclosure.png";
import airHeaterBank250KW     from "../../imports/250kw-air-heater-bank-powder-spray-drying.png";
import purgeAirHeaterThermal  from "../../imports/purge-air-heater-thermal-power-plant.png";
import airHeater40KW          from "../../imports/40kw-air-heater-component-drawing.png";
import airInlineCirculation   from "../../imports/air-inline-circulation-heaters.png";
import hotAirGeneratorLPG     from "../../imports/hot-air-generator-lpg-cylinder-sealing.png";
import purgeAirHeater         from "../../imports/purge-air-heater.png";
import halfRound         from "../../imports/half round.png";
import coiledHeater         from "../../imports/coiled heater.png";
import straightHeater         from "../../imports/straight heater.png";
import uType         from "../../imports/U-shape.png";
import elementHeater         from "../../imports/ELEMENTS FOR OIL SEPERATOR TANK HEATERS.png";
import inLineHeater         from "../../imports/Inline.png";
import oilSump         from "../../imports/oil sump.png";
import outflowHeater         from "../../imports/outflow heater.png";
import preHeater         from "../../imports/oil preheater.png";
import proccessOil         from "../../imports/process oil.png";
import thermic         from "../../imports/theramic fluid.png";
import threadedFlang         from "../../imports/threaded flang.png";
import boiler         from "../../imports/boiler.png";
import coolant         from "../../imports/Coolant.png";
import hotwater         from "../../imports/hotwater.png";
import proccesImm         from "../../imports/proccess immision.png";
import solarPower         from "../../imports/solar power station.png";
import wasteWater         from "../../imports/waste water.png";
import electricSteam         from "../../imports/electric steam.png";
import superSteam         from "../../imports/super steam.png";
import bagFilter         from "../../imports/bag filter.png";
import coiler         from "../../imports/coiler.png";
import ductHeater         from "../../imports/duct heater.png";
import pharma         from "../../imports/pharma.png";
import instrumentDry         from "../../imports/instrument dry.png";
import finHeater         from "../../imports/finHeater.png";
import ovenCircular         from "../../imports/oven circular.png";
import powderCoat         from "../../imports/powderCoated.png";
import powderDryer         from "../../imports/powderdryer.png";
import roomHeater         from "../../imports/roomHeater.png";
import aluCasted         from "../../imports/Alu casted.png";

export const categoryProducts: Record<
  string,
  Array<{ name: string; image: string; description: string; category?: string }>
> = {

  /* ─────────────────────────────────────────────────────────────────
     CUSTOMIZED HEATERS — 20 sub-categories
  ───────────────────────────────────────────────────────────────── */

  "air-heaters": [
    {
      name: "ALONG THE WALL MOUNTED AIR HEATERS FOR OVENS",
      image: wireAnnealingHeater,
      description: "Custom heater for copper wire manufacturing with precise temperature control for wire annealing and enamelling processes.",
      category: "Air Heaters",
    },
    {
      name: "ATMOSPHERIC TESTING CHAMBER",
      image: atmosHeater,
      description: "Heater assembly for powder coating ovens, capacity 40KW to 200KW, for industrial coating applications.",
      category: "Air Heaters",
    },
    {
      name: "BAG FILTERS",
      image: bagFilter,
      description: "Compact inline hot air generator with protective housing for continuous hot air supply in industrial processes.",
      category: "Air Heaters",
    },
    {
      name: "COILER HEATERS FOR OVEN",
      image: coiler,
      description: "High-capacity 850KW air heater bank designed for spray dryer and bag filter applications.",
      category: "Air Heaters",
    },
    {
      name: "DUCT HEATERS",
      image: ductHeater,
      description: "Finned heater for HVAC, AC, and pharmaceutical applications ensuring clean controlled heating environments.",
      category: "Air Heaters",
    },
    {
      name: "HAIR PIN TYPE OVEN HEATERS",
      image: uType,
      description: "Air heater for processing plants with flame-proof enclosure for safe operation in hazardous environments.",
      category: "Air Heaters",
    },
    {
      name: "HEATERS FOR AHU APPLICATION",
      image: airHeaterBank250KW,
      description: "High-capacity 250KW air heater bank specifically designed for powder spray drying applications.",
      category: "Air Heaters",
    },
    {
      name: "HEATERS FOR DEHUMIDIFIERS FOR PHARMA",
      image: pharma,
      description: "Specialized purge air heater for thermal power plant applications ensuring reliable and efficient operation.",
      category: "Air Heaters",
    },
    {
      name: "HEATERS FOR INSTRUMENT DRY AIR",
      image: instrumentDry,
      description: "40KW air heater assembly designed for component drawing applications with precise temperature control.",
      category: "Air Heaters",
    },
    {
      name: "HETAERS WITH FIN",
      image: finHeater,
      description: "Inline circulation heaters for continuous air heating with uniform temperature distribution.",
      category: "Air Heaters",
    },
    {
      name: "HIGH TEMPERATURE FOR TEMPERING FURNACES",
      image: hotAirGeneratorLPG,
      description: "Hot air generator for LPG cylinder plastic cap sealing machines with consistent heat output.",
      category: "Air Heaters",
    },
    {
      name: "HIGH TEMPERATURE HOT AIR GENERATOR",
      image: purgeAirHeater,
      description: "General-purpose purge air heater for various industrial purging and heating applications.",
      category: "Air Heaters",
    },
    {
      name: "OVEN CIRCULATION HEATER, HOT AIR GENERATORS",
      image: ovenCircular,
      description: "General-purpose purge air heater for various industrial purging and heating applications.",
      category: "Air Heaters",
    },
    {
      name: "POWDER COATING OVENS",
      image: powderCoat,
      description: "General-purpose purge air heater for various industrial purging and heating applications.",
      category: "Air Heaters",
    },
    {
      name: "POWDER DRYER",
      image: powderDryer,
      description: "General-purpose purge air heater for various industrial purging and heating applications.",
      category: "Air Heaters",
    },
    {
      name: "ROOM HEATER",
      image: roomHeater,
      description: "General-purpose purge air heater for various industrial purging and heating applications.",
      category: "Air Heaters",
    },
  ],

  "aluminium-casted-heaters": [
    {
      name: "Aluminium Casted Heater",
      image: aluCasted,
      description: "Aluminium casted heated plates for cable manufacturing, pharma packing, and nylon rope manufacturing with excellent thermal conductivity.",
      category: "Aluminium Casted Heaters",
    },
    
  ],

  "aluminium-extrusion-press": [
    {
      name: "FULL ROUND HEATER",
      image: customizedHeater,
      description: "Container heater designed for aluminium extrusion presses ensuring uniform billet heating and optimal extrusion conditions.",
      category: "Aluminium Extrusion Press",
    },
    {
      name: "HALF ROUND HEATER",
      image: halfRound,
      description: "High-watt-density billet pre-heater for aluminium extrusion ensuring consistent temperature profile before pressing.",
      category: "Aluminium Extrusion Press",
    },
    
  ],

  "automotive-foundry": [
    {
      name: "COILED HEATER",
      image: coiledHeater,
      description: "Split-type D heaters, 150mm to 1100mm length, 450W to 3KW power, for automotive die casting and foundry applications.",
      category: "Automotive Foundry",
    },
    {
      name: "STRAIGHT HEATER",
      image: straightHeater,
      description: "Specialized heater for lead melting in automotive battery manufacturing processes with precise temperature control.",
      category: "Automotive Foundry",
    },
    {
      name: "U TYPE",
      image: uType,
      description: "Heavy-duty furnace heater for aluminium and zinc die casting operations in automotive foundries.",
      category: "Automotive Foundry",
    },
  ],

  "belt-dryer": [
    
  ],

  "biogas-generation": [
    
  ],

  "cip-chemical-heating": [
    
  ],

  "copper-annealing": [
  
  ],

  "esp-heaters": [
    {
      name: "Hopper HEATER",
      image: espHeater,
      description: "Hopper pad heater for electrostatic precipitator (ESP) systems preventing ash bridging and ensuring free flow.",
      category: "ESP Heaters",
    },
    {
      name: "PAD",
      image: espHeater,
      description: "Alternative design hopper pad heater for ESP applications with enhanced coverage and heat distribution.",
      category: "ESP Heaters",
    },
    {
      name: "SHAFT",
      image: espHeater,
      description: "Support insulator heater for ESP systems preventing condensation on insulators and maintaining electrical isolation.",
      category: "ESP Heaters",
    },
    {
      name: "SUPPORT",
      image: espHeater,
      description: "Support insulator heater for ESP systems preventing condensation on insulators and maintaining electrical isolation.",
      category: "ESP Heaters",
    },
  ],

  "hnx-nitrogen-heaters": [
    
  ],

  "load-bank": [
    
  ],

  "lpg-propane-evaporators": [
   
  ],

  "oil-heaters": [
    {
      name: "EDIBLE OIL HEATER",
      image: oilHeater,
      description: "Indirect type oil outflow heater, 2KW to 120KW, for thermal oil heating systems with minimal heat loss.",
      category: "Oil Heaters",
    },
    {
      name: "ELEMENTS FOR OIL SEPERATOR TANK HEATERS",
      image: elementHeater,
      description: "Heavy-duty indirect oil heater with vessel specifically designed for steel plant applications.",
      category: "Oil Heaters",
    },
    {
      name: "IN LINE OIL HEATERS",
      image: inLineHeater,
      description: "Standard oil outflow heaters for thermal oil systems with reliable and efficient heat transfer.",
      category: "Oil Heaters",
    },
    {
      name: "OIL SUMP HEATERS",
      image: oilSump,
      description: "Oil pre-heater for oil-fired boiler systems ensuring optimal fuel viscosity and combustion efficiency.",
      category: "Oil Heaters",
    },
    {
      name: "OUT FLOW HEATERS",
      image: outflowHeater,
      description: "Oil circulation heater for continuous thermal oil heating with uniform temperature control.",
      category: "Oil Heaters",
    },
    {
      name: "PRE HEATERS FOR OIL FIRED BOILERS",
      image: preHeater,
      description: "Industrial oil heater for steel mill applications with robust construction and high watt density.",
      category: "Oil Heaters",
    },
    {
      name: "PROCCESS OIL HEATER",
      image: proccessOil,
      description: "Oil-filled outer finned tube design for enhanced heat transfer efficiency in oil heating systems.",
      category: "Oil Heaters",
    },
    {
      name: "THERMIC FLUID ELECTRIC HEATER FOR CIRCULATION",
      image: thermic,
      description: "Indirect oil heater with outer tube finned design for improved thermal performance and energy efficiency.",
      category: "Oil Heaters",
    },
    {
      name: "THREADED FLANG TYPE ",
      image: threadedFlang,
      description: "Complete oil outflow heater system with integrated control panel for automated operation and monitoring.",
      category: "Oil Heaters",
    },
    {
      name: "TRANSFORMER OIL HEATER",
      image: controlPanel,
      description: "Complete oil outflow heater system with integrated control panel for automated operation and monitoring.",
      category: "Oil Heaters",
    },
  ],

  "packaging-machine-tunnel": [
    
  ],

  "panel-heaters": [
    
  ],

  "reactor-heater": [
    
  ],

  "space-heaters": [
    

  ],

  "steam-heaters": [
    {
      name: "Electric Steam Generators",
      image: electricSteam,
      description: "Electric steam generator for industrial processes requiring clean and controlled steam supply without combustion.",
      category: "Steam Heater",
    },
    {
      name: "SUPER HEATED STEAM",
      image: superSteam,
      description: "Inline electric steam superheater for raising saturated steam to superheated steam for industrial turbines and process plants.",
      category: "Steam Heater",
    },
    
  ],

  "syngas-heaters": [
   
  ],

  "water-heaters": [
    {
      name: "BOILERS",
      image: boiler,
      description: "Water heater with vessel and IP55 rated enclosure for industrial applications requiring moisture protection.",
      category: "Water Heater",
    },
    {
      name: "COOLANT HEATER",
      image: coolant,
      description: "High-capacity 750KW water heater assembly designed for solar power plant process heating applications.",
      category: "Water Heater",
    },
    {
      name: "HOT WATER GENERATORS",
      image: hotwater,
      description: "Water heater with flame-proof enclosure for safe operation in hazardous area environments.",
      category: "Water Heater",
    },
    {
      name: "INDUSTRIAL WATER HEATER AND WATER HEATERS",
      image: waterHeater,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
    {
      name: "PROCESS IMMERSION HEATERS",
      image: proccesImm,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
    {
      name: "Solar Backup Apllication",
      image: waterHeater,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
    {
      name: "Solar Power Station",
      image: solarPower,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
    {
      name: "Threaded Flange Type",
      image: threadedFlang,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
    {
      name: "Waste Water Heating",
      image: wasteWater,
      description: "Versatile water heater with vessel, available 50KW to 200KW, for various industrial process heating requirements.",
      category: "Water Heater",
    },
  ],

  /* ─────────────────────────────────────────────────────────────────
     CUSTOMIZED HEATERS — top-level landing (sub-categories listed above)
  ───────────────────────────────────────────────────────────────── */
  "customized-heaters": [],

  /* ─────────────────────────────────────────────────────────────────
     D-TYPE HEATERS — sub-categories
  ───────────────────────────────────────────────────────────────── */
  "d-type-standard": [
    // { name: "", image: dTypeHeater, description: "", category: "D Type Heaters" },
  ],

  /* ─────────────────────────────────────────────────────────────────
     CONTROL PANELS — sub-categories
  ───────────────────────────────────────────────────────────────── */
  "control-panel-on-off": [
    // { name: "", image: controlPanel, description: "", category: "Control Panels" },
  ],

  "control-panel-thyristorised": [
    // { name: "", image: controlPanel, description: "", category: "Control Panels" },
  ],

  /* ─────────────────────────────────────────────────────────────────
     STANDARD HEATERS — sub-categories
  ───────────────────────────────────────────────────────────────── */
  "std-u-shaped-air": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-industrial-water": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-oil-heating": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-solar": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-alkaline": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-chemical": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  "std-fin": [
    // { name: "", image: standardHeater, description: "", category: "Standard Heaters" },
  ],

  /* ─────────────────────────────────────────────────────────────────
     CARTRIDGE HEATERS — sub-categories
  ───────────────────────────────────────────────────────────────── */
  "cartridge-threaded": [
    // { name: "", image: cartridgeHeater, description: "", category: "Cartridge Heaters" },
  ],

  "cartridge-flameproof": [
    // { name: "", image: cartridgeHeater, description: "", category: "Cartridge Heaters" },
  ],

  "cartridge-high-density": [
    // { name: "", image: cartridgeHeater, description: "", category: "Cartridge Heaters" },
  ],

  "cartridge-low-density": [
    // { name: "", image: cartridgeHeater, description: "", category: "Cartridge Heaters" },
  ],

  /* ─────────────────────────────────────────────────────────────────
     OPEN WIRE HEATERS — sub-categories
  ───────────────────────────────────────────────────────────────── */
  "open-wire-furnace": [
    // { name: "", image: openWire, description: "", category: "Open Wire Heaters" },
  ],

  "open-wire-bundle-rod": [
    // { name: "", image: openWire, description: "", category: "Open Wire Heaters" },
  ],

  "open-wire-stripe": [
    // { name: "", image: openWire, description: "", category: "Open Wire Heaters" },
  ],

  "open-wire-bionet": [
    // { name: "", image: openWire, description: "", category: "Open Wire Heaters" },
  ],
};

// Export individual images for use in other components
export {
  customizedHeater,
  controlPanel,
  dTypeHeater,
  openWire,
  standardHeater,
  cartridgeHeater,
  wireAnnealingHeater,
  powderCoatingOvenHeater,
  inlineHotAirGenerator,
  airHeaterBankSprayDryer,
  finnedHeaterHVAC,
  airHeaterFlameProof,
  airHeaterBank250KW,
  purgeAirHeaterThermal,
  airHeater40KW,
  airInlineCirculation,
  hotAirGeneratorLPG,
  purgeAirHeater,
};

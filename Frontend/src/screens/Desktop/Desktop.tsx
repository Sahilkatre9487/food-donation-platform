import {
  AwardIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  Menu,
  X,
  Headphones,
  Award,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { LoadingScreen } from "../../components/animations/LoadingScreen";
import { TextReveal } from "../../components/animations/TextReveal";
import { ProductCarousel } from "../../components/animations/ProductCarousel";
import { AnimatedFAQ } from "../../components/animations/AnimatedFAQ";
import { useNavigate } from "react-router-dom";
import p1 from "../../assets/p1.jpeg";
import p2 from "../../assets/p2.jpeg";
import p3 from "../../assets/p3.jpeg";
import p4 from "../../assets/p4.jpeg";
import p5 from "../../assets/p5.jpeg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import model from "../../assets/model.jpeg";

export const Desktop = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("NEW ARRIVAL");
 const navigate = useNavigate();
  // Navigation items
const navItems = [
  { name: "Home", href: "#" },
  { name: "Our Process", href: "#" },     // Instead of "How It Works"
  { name: "FAQs", href: "#" },           // Capitalized & formal
  { name: "Get in Touch", href: "#" },   // Instead of "contact"
];

  // Why our products section data
  const whyOurProducts = [
 {
    number: "01",
    title: "Share Surplus Meals",
    description:
      "Restaurants post their extra food along with live location and details, making it easy for volunteers and NGOs to find and collect it.",
  },
  {
    number: "02",
    title: "Instant Volunteer Pick-Up",
    description:
      "Verified volunteers and NGOs receive real-time notifications, ensuring timely and safe pick-up of surplus meals without any waste.",
  },
  {
    number: "03",
    title: "Deliver & Delight",
    description:
      "Meals are delivered to people in need, reducing food waste and creating smiles. Each shared meal helps build a hunger-free, waste-free community.",
  },
  ];

  // Product data
  const products = [
{
  id: 1,
  name: "Leftover Food Donation",
  image: p3,
  category: "HOTEL CONTRIBUTIONS",
},
{
  id: 2,
  name: "Volunteer Food Pickup",
  image: p4,
  category: "COMMUNITY SERVICE",
},
{
  id: 3,
  name: "Meals Delivered with Care",
  image: p5,
  category: "TRUST & TRANSPARENCY",
},


  ];

  

  // FAQ data
  const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform helps restaurants and NGOs/volunteers share leftover food safely with people in need — reducing food waste and hunger.",
  },
  {
    question: "How can a restaurant donate food?",
    answer:
      "Restaurants sign up, post details about leftover food, and share their live location. Verified volunteers can then see the posts and come to pick it up.",
  },
  {
    question: "Who can become a volunteer?",
    answer:
      "Only verified NGO members or individuals approved by registered organizations can volunteer. This keeps the process safe and trustworthy.",
  },
  {
    question: "How do you verify NGOs and volunteers?",
    answer:
      "We check NGO registration certificates and issue digital ID badges with QR codes. Restaurants can scan these before handing over food.",
  },
  {
    question: "Is there any cost to use the platform?",
    answer:
      "Nope! The platform is completely free for both restaurants and volunteers.",
  },
  {
    question: "What happens after a volunteer picks up the food?",
    answer:
      "The volunteer marks the pickup as 'Completed.' The system logs it in your history and updates your impact statistics.",
  },
  ];

  // Footer links
  const socialLinks = ["Facebook", "Instagram", "Youtube"];
  const policyLinks = ["Terms of Service", "Privacy Policy", "Cookies Policy"];

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="bg-[#eff5e1] flex flex-row justify-center w-full">
      <div
        className={`bg-[#eff5e1] overflow-hidden w-full max-w-[1920px] relative transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header/Navigation */}
        <header className="flex justify-between items-center px-4 md:px-8 lg:px-[100px] py-6 md:py-[49px] relative z-40">
          <div className="font-extrabold text-[#2d3b36] text-2xl md:text-3xl [font-family:'Inter',Helvetica] tracking-[0] leading-[normal]">
            ZEROhunger
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-xl tracking-[-1.00px] leading-[normal] hover:text-[#2d3b36]/70 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
            
           
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 bg-[#f8fee5] rounded-[20px] hover:bg-[#f0f7d4] transition-colors"
               onClick={() => navigate("/login")}
            >
              <UserIcon className="w-5 h-5" />
            </Button>
              <span className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-lg lg:text-xl tracking-[-1.00px] ml-2">
                LOGIN 
              </span>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-10 h-10 bg-[#f8fee5] rounded-[20px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#eff5e1] z-50 md:hidden">
            <div className="flex justify-between items-center px-4 py-6">
              <div className="font-extrabold text-[#2d3b36] text-2xl [font-family:'Inter',Helvetica]">
                ZEROhunger
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-[#f8fee5] rounded-[20px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6 px-4 mt-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-2xl tracking-[-1.00px] leading-[normal] py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-center space-x-6 mt-12">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-[#f8fee5] rounded-[20px]"
              >
                <ShoppingBagIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-[#f8fee5] rounded-[20px]"
              >
                <HeartIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 bg-[#f8fee5] rounded-[20px]"
              >
                <UserIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-4 md:px-8 lg:px-[100px] mt-8 md:mt-[100px] flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
          <div className="max-w-[335px] text-center lg:text-left order-2 lg:order-1">
            <h1 className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-lg md:text-xl tracking-[0] leading-[normal]">
        Turning surplus meals into hope by connecting restaurants, NGOs, and volunteers in real-time.
Together, we fight food waste and feed communities, one meal at a time.
            </h1>
            <Button className="mt-6 md:mt-10 bg-[#2d3b36] text-[#eff5e1] rounded-[100px] h-[50px] md:h-[60px] w-[160px] md:w-[180px] hover:bg-[#2d3b36]/90 transition-all duration-300 transform hover:scale-105">
              <span className="[font-family:'Inter',Helvetica] font-normal text-lg md:text-xl">
                Learn More
              </span>
            </Button>
          </div>

          <div className="relative text-center order-1 lg:order-2">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#2d3b36] text-[60px] md:text-[80px] lg:text-[100px] tracking-[-3.00px] leading-[0.9]">
              Turning Leftovers 
              <br />
              into Lifesavers
            </h2>
          </div>

          <div className="order-3">
            <img
              className="w-[180px] md:w-[223px] h-[180px] md:h-[220px] object-cover rounded-xl"
              alt="Skin care beauty"
              src={p1}
            />
          </div>
        </section>

        {/* Large SKINCARE text with image */}
        <section className="relative mt-16 md:mt-[100px] h-[400px] md:h-[685px] overflow-hidden">
          <div className="absolute top-[200px] md:top-[410px] left-0 font-extrabold text-[#2d3b36] text-[120px] md:text-[200px] lg:text-[378px] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal] whitespace-nowrap opacity-20 md:opacity-100">
            ZEROhunger
          </div>

          <img
            className="absolute w-[300px] md:w-[450px] lg:w-[610px] h-[350px] md:h-[500px] lg:h-[676px] top-0 left-1/2 md:left-[400px] lg:left-[673px] transform -translate-x-1/2 md:transform-none object-cover rounded-2xl"
            alt="Skincare product"
            src={p2}
          />

          <div className="absolute w-[280px] md:w-[400px] lg:w-[476px] h-[80px] md:h-[90px] lg:h-[100px] top-[320px] md:top-[450px] lg:top-[546px] left-1/2 md:left-[450px] lg:left-[740px] transform -translate-x-1/2 md:transform-none bg-[#eff5e1] rounded-[200px] flex items-center px-2">
            <div className="w-[70px] md:w-[80px] lg:w-[90px] h-[70px] md:h-[80px] lg:h-[90px] bg-[#eff5e1] rounded-[50px] border border-dashed border-[#2d3b36] flex items-center justify-center flex-shrink-0">
              <img
                className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 object-cover rounded-full"
                alt="Skin care beauty"
                src={p1}
              />
            </div>
            <div className="ml-3 md:ml-4 [font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-sm md:text-lg lg:text-xl tracking-[0] leading-[normal]">
          Providing a simple way to share meals and make an impact.
            </div>
          </div>
        </section>

        {/* Main content section */}
        <section className="bg-[#fefff4] pt-12 md:pt-[99px] px-4 md:px-8 lg:px-[100px]">
         {/* Introduction text with animation */}
<div className="mb-8 md:mb-[60px]">
  <TextReveal
    text="Experience the joy of turning surplus food into meals for those in need. Our platform connects restaurants, NGOs, and volunteers seamlessly, ensuring every extra bite reaches people who matter most. With real-time tracking and verified pickups, we make food donation simple, safe, and impactful. Join us in reducing waste, feeding communities, and making every meal count."
    className="[font-family:'Inter',Helvetica] font-normal text-[24px] md:text-[36px] lg:text-[53px] tracking-[2px] leading-[1.4] md:leading-[78px]"
  />
</div>


         

      

{/* Why our products section with model image */}
<div className="mt-12 md:mt-[100px] flex flex-col lg:flex-row gap-8 lg:gap-2">
  {/* Left Content */}
  <div className="w-full lg:w-1/2">
    <Badge className="bg-[#fefff4] text-[#2d3b36] rounded-[100px] border border-solid border-[#2d3b36] h-[50px] md:h-[60px] px-6 md:px-[58px] flex items-center w-fit">
      <div className="w-4 md:w-5 h-4 md:h-5 rounded-[10px] bg-[#2d3b36] mr-3 md:mr-4"></div>
      <span className="[font-family:'Inter',Helvetica] font-normal text-lg md:text-xl">
       How It Works
      </span>
    </Badge>

{/* Your community deserves section */}
<div className="mt-8 md:mt-[60px]">
  <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-3xl md:text-5xl lg:text-6xl tracking-[-1.20px] leading-[normal]">
    EVERY MEAL DESERVES <br />
    TO MAKE AN IMPACT.
  </h2>
  <p className="mt-4 md:mt-6 [font-family:'Inter',Helvetica] font-normal text-[#525349] text-base md:text-lg tracking-[-0.36px] leading-6">
    Join our smart food-sharing platform to connect restaurants with volunteers and NGOs, 
    ensuring surplus meals reach those who need them most. Together, we reduce food waste 
    and nourish communities every day.
  </p>
</div>


    <div className="mt-8 md:mt-[60px] space-y-8 md:space-y-[60px]">
      {whyOurProducts.map((item, index) => (
        <div key={index} className="flex">
          <div
            className="bg-clip-text text-transparent font-normal text-6xl tracking-[-1.20px] leading-[normal] whitespace-nowrap mr-8 [font-family:'Inter',Helvetica]"
            style={{
              background:
                "linear-gradient(180deg, rgba(41,51,48,1) 0%, rgba(254,255,244,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {item.number}
          </div>

          <div>
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-2xl md:text-4xl lg:text-6xl tracking-[-1.20px] leading-[normal]">
              {item.title}
            </h3>
            <p className="mt-2 md:mt-4 [font-family:'Inter',Helvetica] font-normal text-[#525349] text-base md:text-lg tracking-[-0.36px] leading-6">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Right Image Section */}
  <div className="w-full lg:w-1/2  relative pb-12 md:mb-24">
    {/* Model Image */}
    <div
      className="w-full h-[600px] md:h-[800px] lg:h-[800px] bg-cover bg-center rounded-lg md:rounded-4xl"
      style={{ backgroundImage: `url(${p6})` }}
    >
      
      {/* Award Badge */}
       <div className="absolute bottom-6 md:bottom-[39px] left-1/2 lg:left-[225px] transform -translate-x-1/2 lg:transform-none flex items-center bg-[#eff5e1] rounded-[200px] px-3 md:px-5 py-2 md:py-4 w-fit mb-24">
    <div className="w-[50px] md:w-[70px] h-[50px] md:h-[70px] bg-[#2d3b36] rounded-full flex items-center justify-center border border-dashed border-[#2d3b36] mr-3 md:mr-4">
      <Award className="w-4 md:w-6 h-4 md:h-6 text-white" />
    </div>
    <div className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-sm md:text-xl leading-tight">
  Turning Surplus Food 
  <br />
  Into Smiles
    </div>
  </div>
    </div>

    {/* Footer Text */}
    <div className="absolute bottom-2 md:bottom-4 w-full px-4 lg:px-0 flex justify-between text-[#2d3b36] text-lg md:text-xl font-normal">
      
      <span className="cursor-pointer hover:text-[#2d3b36]/70 transition-colors">
        LEARN MORE
      </span>
    </div>
  </div>
</div>


          {/* Best Selling Products section */}
          <div className="mt-24 md:mt-[200px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-[40px] space-y-4 md:space-y-0">
              <Badge className="bg-[#fefff4] text-[#2d3b36] rounded-[100px] border border-solid border-[#2d3b36] h-[50px] md:h-[60px] px-6 md:px-[58px] flex items-center w-fit">
                <div className="w-4 md:w-5 h-4 md:h-5 rounded-[10px] bg-[#2d3b36] mr-3 md:mr-4"></div>
                <span className="[font-family:'Inter',Helvetica] font-normal text-lg md:text-xl whitespace-nowrap">
                  Our Services
                </span>
              </Badge>
            </div>

            <h2 className="text-center [font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-3xl md:text-5xl lg:text-6xl tracking-[-1.20px] leading-[normal] mb-8 md:mb-[60px]">
               Meals That Nourish Lives
              <br />
              And Reduce Food Waste
            </h2>

            <ProductCarousel
              products={products}
              className="mt-8 md:mt-[60px]"
              showSliderControls={true}
            />
          </div>

          {/* Full width banner with model */}
          <div className="mt-24 md:mt-[200px] relative w-full h-[600px] md:h-[800px] lg:h-[1146px] rounded-lg lg:rounded-none overflow-hidden ">
            <img
              className="w-full h-full object-cover rounded-3xl"
              alt="Model with skincare"
              src={model}
            />
            <div className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px] rounded-[30px] [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(41,51,48,1)_100%)] flex flex-col items-center justify-end pb-8 md:pb-[80px] px-4">
              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#fefff4] text-3xl md:text-5xl lg:text-[80px] text-center tracking-[-1.60px] leading-[normal] mb-6 md:mb-8">
                Meals That Nourish Lives
                <br />
                  And Reduce Food Waste
              </h2>
              <Button className="bg-[#fefff4] text-[#2d3b36] rounded-[100px] h-[50px] md:h-[60px] w-[160px] md:w-[180px] hover:bg-[#f0f7d4] transition-all duration-300 transform hover:scale-105">
                <span className="[font-family:'Inter',Helvetica] font-normal text-lg md:text-xl">
                  REGISTER
                </span>
              </Button>
            </div>
          </div>

      

          {/* FAQ and Support section */}
          <div className="mt-24 md:mt-[200px] flex flex-col lg:flex-row gap-8 lg:gap-[150px] ">
            <div className="w-full lg:w-1/2 h-[400px] md:h-[600px] lg:h-[900px] relative rounded-lg lg:rounded-none overflow-hidden md:pb-12 ">
  {/* Image behind badge */}
  <img
    src={p7}
    alt="Product"
    className="w-full h-full object-cover rounded-2xl "
  />

  {/* Combined Badge with Headphone */}
  <div className="absolute bottom-6 md:bottom-[39px] left-1/2 lg:left-[225px] transform -translate-x-1/2 lg:transform-none flex items-center bg-[#eff5e1] rounded-[200px] px-3 md:px-5 py-2 md:py-4 w-fit md:mb-24">
    <div className="w-[50px] md:w-[70px] h-[50px] md:h-[70px] bg-[#2d3b36] rounded-full flex items-center justify-center border border-dashed border-[#2d3b36] mr-3 md:mr-4">
      <Headphones className="w-4 md:w-6 h-4 md:h-6 text-white" />
    </div>
    <div className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-sm md:text-xl leading-tight">
      24/7 We're Here
      <br />
      to Help You
    </div>
  </div>
</div>


            <div className="flex-1">
              <Badge className="bg-[#fefff4] text-[#2d3b36] rounded-[100px] border border-solid border-[#2d3b36] h-[50px] md:h-[60px] px-6 md:px-[58px] flex items-center mb-6 md:mb-[40px] w-fit">
                <div className="w-4 md:w-5 h-4 md:h-5 rounded-[10px] bg-[#2d3b36] mr-3 md:mr-4"></div>
                <span className="[font-family:'Inter',Helvetica] font-normal text-sm md:text-xl">
                  Frequently Asked Question
                </span>
              </Badge>

              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#2d3b36] text-3xl md:text-5xl lg:text-6xl tracking-[-1.20px] leading-[normal] mb-8 md:mb-[60px]">
                Answers to Your
                <br />
                Food Donation Questions,
                <br />
                 All in One Place.
              </h2>

              <AnimatedFAQ faqs={faqs} />
            </div>
          </div>
        </section>

      {/* Footer */}
<footer className="bg-[#2d3b36] text-[#e7e8e0] pt-12 md:pt-[199px] px-4 md:px-8 lg:px-[100px] pb-12 md:pb-[100px] relative overflow-hidden">
  <div className="flex flex-col md:flex-row justify-between mb-12 md:mb-[200px] space-y-8 md:space-y-0">
    <div>
      <h2 className="[font-family:'Inter',Helvetica] font-normal text-3xl md:text-5xl lg:text-6xl tracking-[-1.20px] leading-[normal]">
        Join The Food-Sharing
        <br />
        Community Today.
      </h2>
    </div>
    <div className="text-center md:text-right">
      <h3 className="[font-family:'Inter',Helvetica] font-normal text-xl md:text-2xl lg:text-3xl tracking-[-0.60px] leading-[normal] mb-2">
        Get in Touch
      </h3>
      <p className="[font-family:'Inter',Helvetica] font-normal text-2xl md:text-4xl lg:text-6xl tracking-[-1.20px] leading-[normal] hover:text-[#eff5e1]/80 transition-colors cursor-pointer">
        support@zerohunger.org
      </p>
    </div>
  </div>

  <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href="#"
          className="[font-family:'Inter',Helvetica] font-normal text-[#eff5e1] text-lg md:text-xl tracking-[-1.00px] leading-[normal] hover:text-[#eff5e1]/70 transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
      {policyLinks.map((link, index) => (
        <a
          key={index}
          href="#"
          className="[font-family:'Inter',Helvetica] font-normal text-[#eff5e1] text-lg md:text-xl tracking-[-1.00px] leading-[normal] hover:text-[#eff5e1]/70 transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
  </div>

  <div className="absolute bottom-0 left-0 font-bold text-[#3d4b4680] text-[120px] md:text-[250px] lg:text-[420px] [font-family:'Inter',Helvetica] tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none">
    ZEROhunger
  </div>
</footer>

      </div>
    </div>
  );
};





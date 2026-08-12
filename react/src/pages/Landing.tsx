import React from "react";
import { INTEGRATIONS, Integration } from "../data/integrations";

interface LandingProps {
  onSelectIntegration: (integration: Integration) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectIntegration }) => {
  return (
    <div className="min-h-screen bg-white py-8 px-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-xl font-bold text-black mb-6">Integrations</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          
          {INTEGRATIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectIntegration(item)}
              className="box-border bg-white border border-[#E5E7EB] rounded-[12px] text-center cursor-pointer transition-all duration-[120ms] ease-in-out flex flex-col items-center justify-center aspect-square p-4 hover:border-2 hover:border-[#003F9C] hover:-m-[1px] focus-visible:border-2 focus-visible:border-[#003F9C] focus-visible:-m-[1px] focus-visible:outline-none"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            
              <h3 className="m-0 text-[14px] font-bold text-[#000000] leading-normal mb-2">
                {item.name}
              </h3>
              
              <span className="inline-flex items-center justify-center h-[24px] px-[12px] rounded-[40px] bg-[#F1F5F9] text-[14px] font-normal text-[#000000] leading-normal">
                {item.badge || item.category || "Data"}
              </span>
            </button>
          ))}

          {[1, 2, 3, 4, 5, 6, 7, 8].map((emptyBox) => (
            <div
              key={`empty-${emptyBox}`}
              className="box-border bg-white border border-[#E5E7EB] rounded-[12px] aspect-square"
            />
          ))}

        </div>
      </div>
    </div>
  );
};
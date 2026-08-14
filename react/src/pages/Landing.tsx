import React, { useEffect, useState } from "react";
import { Integration } from "../data/integrations";

interface LandingProps {
  onSelectIntegration: (integration: Integration) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectIntegration }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const customerId = queryParams.get("genesisId");
        const authToken = queryParams.get("token");

        if (!customerId || !authToken) {
          throw new Error("Missing Genesis (genesisId or token) on URL.");
        }

        const response = await fetch(`http://localhost:8080/api/integrations?genesisId=${customerId}&token=${authToken}`, {
          method: "GET",
          headers: {
            "x-genesis-customer-id": customerId,
            "x-genesis-auth-token": authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch integrations list from server.");
        }

        const data = await response.json();
        setIntegrations(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-8 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading integrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 px-8 flex items-center justify-center">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-xl font-bold text-black mb-6">Integrations</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          
          {integrations.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectIntegration(item)}
              className="box-border bg-white border border-[#E5E7EB] rounded-[12px] text-center cursor-pointer transition-all duration-[120ms] ease-in-out flex flex-col items-center justify-center aspect-square p-4 hover:border-2 hover:border-[#003F9C] hover:-m-[1px] focus-visible:border-2 focus-visible:border-[#003F9C] focus-visible:-m-[1px] focus-visible:outline-none relative"
            >
              {item.isConfigured && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full" title="Configured" />
              )}

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

          {[...Array(Math.max(0, 8 - integrations.length))].map((_, emptyBox) => (
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
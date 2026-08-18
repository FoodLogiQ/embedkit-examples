import React, { useState, useEffect } from "react";
import { Integration, IntegrationConfigure, NetsuiteConfigure, OracleConfigure, SapConfigure, SlackConfigure } from "../data/integrations";

interface DetailProps {
  integration: Integration;
  onBack: () => void;
}

const SlackDetails = ({ formData, handleChange }: { formData: SlackConfigure; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Client ID</label>
      <input
        type="text"
        name="clientId"
        value={formData.clientId || ""}
        onChange={handleChange}
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Client Secret</label>
      <input
        type="password"
        name="clientSerect"
        value={formData.clientSerect || ""}
        onChange={handleChange}
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Access Token</label>
      <input
        type="password"
        name="accessToken"
        value={formData.accessToken || ""}
        onChange={handleChange}
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Channel Name</label>
      <input
        type="text"
        name="channelName"
        value={formData.channelName || ""}
        onChange={handleChange}
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);
const DefaultDetails = ({ formData, handleChange }: { formData: OracleConfigure; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">API_URL</label>
      <input
        type="text"
        name="apiUrl"
        value={formData.apiUrl || ""}
        onChange={handleChange}
        placeholder="https://api.boomi.com/partner/api/rest/v1"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">API_ACCOUNT_ID</label>
      <input
        type="text"
        name="apiAccountId"
        value={formData.apiAccountId || ""}
        onChange={handleChange}
        placeholder="esharesearchllcdbatrustwe-XXXXXX"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">API_USERNAME</label>
      <input
        type="text"
        name="apiUsername"
        value={formData.apiUsername|| ""}
        onChange={handleChange}
        placeholder="BOOMI_TOKEN.user@trustwell.com"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">API_TOKEN</label>
      <input
        type="password"
        name="apiToken"
        value={formData.apiToken || ""}
        onChange={handleChange}
        placeholder="••••••••••••••••••••••••••••"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);
const SapDetails = ({ formData, handleChange }: { formData: SapConfigure; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">ODATA Service URL</label>
      <input
        type="text"
        name="ODATA_URL"
        value={formData.ODATA_URL || ""}
        onChange={handleChange}
        placeholder="https://myxxxxxx.s4hana.ondemand.com/sap/opu/odata/sap/..."
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Username</label>
      <input
        type="text"
        name="USERNAME"
        value={formData.USERNAME || ""}
        onChange={handleChange}
        placeholder="SAP_USER_API"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Password / Token</label>
      <input
        type="password"
        name="PASSWORD"
        value={formData.PASSWORD || ""}
        onChange={handleChange}
        placeholder="••••••••••••••••••••••••••••"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);
const NetsuiteDetails = ({ formData, handleChange }: { formData: NetsuiteConfigure; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Account ID</label>
      <input
        type="text"
        name="ACCOUNT_ID"
        value={formData.ACCOUNT_ID || ""}
        onChange={handleChange}
        placeholder="TSTDRV1234567"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Consumer Key (Token ID)</label>
      <input
        type="text"
        name="CONSUMER_KEY"
        value={formData.CONSUMER_KEY || ""}
        onChange={handleChange}
        placeholder="a1b2c3d4...-consumer-key"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Consumer Secret</label>
      <input
        type="password"
        name="CONSUMER_SECRET"
        value={formData.CONSUMER_SECRET || ""}
        onChange={handleChange}
        placeholder="••••••••••••••••••••••••••••"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Token ID & Secret (TBA)</label>
      <input
        type="text"
        name="TOKEN_ID"
        value={formData.TOKEN_ID || ""}
        onChange={handleChange}
        placeholder="Token ID / Secret Combo"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);

export const Detail: React.FC<DetailProps> = ({ integration, onBack }) => {
  const [formData, setFormData] = useState<IntegrationConfigure>({id: integration.id});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const isSlack = integration.id === "slack_integration" || integration.id === "stack_integration";
  const isSap = integration.id === "sap_s4hana";
  const isNetsuite = integration.id === "netsuite";

  const queryParams = new URLSearchParams(window.location.search);
  const genesisId = queryParams.get("genesisId");
  const token = queryParams.get("token");

  useEffect(() => {
    const fetchConfigFromDB = async () => {
      if (!genesisId || !token) return;
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:8080/api/credentials/${integration.id}?genesisId=${genesisId}&token=${token}`,
          {
            method: "GET",
            headers: {
              "x-genesis-customer-id": genesisId,
              "x-genesis-auth-token": token,
            },
          }
        );

            console.log("Response:", response);

        if (response.ok) {
          const data = await response.json();
          if (data && data.configPayload) {
            setFormData(JSON.parse(data.configPayload));
          } else {
            setDefaultInitialValues();
          }
        } else {
          setDefaultInitialValues();
        }
      } catch (error) {
        console.error("Failed to load credentials", error);
        setDefaultInitialValues();
      } finally {
        setIsLoading(false);
      }
    };

    const setDefaultInitialValues = () => {
      if (isSlack) {
        setFormData({
          id: integration.id,
          clientId: "",
          clientSerect: "",
          accessToken: "",
          channelName: "",
        } as SlackConfigure);
      }
      else if (isNetsuite) {
        setFormData({
          id: integration.id,
          ACCOUNT_ID: "",
          CONSUMER_KEY: "",
          CONSUMER_SECRET: "",
          TOKEN_ID: ""
        } as NetsuiteConfigure);
      }
      else if (isSap) {
        setFormData({
          id: integration.id,
          ODATA_URL: "",
          USERNAME: "",
          PASSWORD: "" 
        } as SapConfigure);
      }
      else {
        setFormData({
          id: integration.id,
          apiUrl: "",
          apiAccountId: "",
          apiUsername: "",
          apiToken: "",
        } as OracleConfigure);
      }
    };

    fetchConfigFromDB();
  }, [integration.id, isSlack, genesisId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target)
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    setSaveStatus(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving...");

    try {
      const response = await fetch(
        `http://localhost:8080/api/credentials/${integration.id}?genesisId=${genesisId}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-genesis-customer-id": genesisId || "",
            "x-genesis-auth-token": token || "",
          },
          body: JSON.stringify(formData),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to save credentials");
      }

      setSaveStatus("saved!");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 mb-6 transition-colors"
        >
          <span className="mr-2">←</span> Back to Integrations
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-6 mb-6">
            <img
              src={integration.iconUrl}
              alt={integration.name}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-950">
                {integration.name} Configuration
              </h1>
              <p className="text-sm text-gray-600">
                {isSlack 
                  ? "Configure Client credentials and channel settings for your integration." 
                  : "Configure connection credentials for database integration."}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-gray-600 text-sm">
              Loading configuration from DB...
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {isSlack ? (
                <SlackDetails formData={formData} handleChange={handleChange} />
              ) : isSap ? (
                <SapDetails formData={formData} handleChange={handleChange} />
              ) : isNetsuite ? (
                <NetsuiteDetails formData={formData} handleChange={handleChange} />
              ) : (
                <DefaultDetails formData={formData} handleChange={handleChange} />
              )}
              <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-200 mt-2">
                {saveStatus === "saved!" && (
                  <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    ✓ Saved successfully!
                  </span>
                )}
                {saveStatus === "error" && (
                  <span className="text-sm font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
                    ✕ Failed to save!
                  </span>
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="px-5 py-2.5 text-[14px] font-medium text-gray-800 bg-white border border-gray-400 rounded-[6px] hover:bg-gray-100 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saveStatus === "saving..."}
                  className="px-6 py-2.5 text-[14px] font-medium text-white bg-[#4F46E5] rounded-[6px] hover:bg-[#4338CA] focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] disabled:opacity-50 transition-colors shadow-sm"
                >
                  {saveStatus === "saving..." ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
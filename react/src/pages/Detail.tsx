import React, { useState, useEffect } from "react";
import { Integration } from "../data/integrations";

interface DetailProps {
  integration: Integration;
  onBack: () => void;
}

// ==========================================
// 1. COMPONENT: SLACK (STACK) DETAILS FORM
// ==========================================
const SlackDetails = ({ formData, handleChange }: { formData: any; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Client ID</label>
      <input
        type="text"
        name="CLIENT_ID"
        value={formData.CLIENT_ID || ""}
        onChange={handleChange}
        placeholder="123456789012.123456789012"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Client Secret</label>
      <input
        type="password"
        name="CLIENT_SECRET"
        value={formData.CLIENT_SECRET || ""}
        onChange={handleChange}
        placeholder="••••••••••••••••••••••••••••"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Access Token</label>
      <input
        type="password"
        name="ACCESS_TOKEN"
        value={formData.ACCESS_TOKEN || ""}
        onChange={handleChange}
        placeholder="xoxb-your-bot-access-token"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">Channel Name</label>
      <input
        type="text"
        name="CHANNEL_NAME"
        value={formData.CHANNEL_NAME || ""}
        onChange={handleChange}
        placeholder="#general"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);

// ==========================================
// 2. COMPONENT: DEFAULT (ORACLE/BOOMI) DETAILS FORM
// ==========================================
const DefaultDetails = ({ formData, handleChange }: { formData: any; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <div className="flex flex-col">
      <label className="block text-[14px] font-semibold text-black mb-1">API_URL</label>
      <input
        type="text"
        name="API_URL"
        value={formData.API_URL || ""}
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
        name="API_ACCOUNT_ID"
        value={formData.API_ACCOUNT_ID || ""}
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
        name="API_USERNAME"
        value={formData.API_USERNAME || ""}
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
        name="API_TOKEN"
        value={formData.API_TOKEN || ""}
        onChange={handleChange}
        placeholder="••••••••••••••••••••••••••••"
        className="box-border w-full h-[40px] px-[12px] bg-white border border-gray-400 rounded-[6px] text-gray-900 text-[14px] font-mono leading-[1.2] placeholder-gray-500 hover:border-gray-600 focus:outline focus:outline-[3px] focus:outline-[#0071EC] focus:outline-offset-[2px] focus:border-[#0071EC] focus:ring-0 transition-colors"
        required
      />
    </div>
  </>
);

// ==========================================
// 3. MAIN WRAPPER COMPONENT
// ==========================================
export const Detail: React.FC<DetailProps> = ({ integration, onBack }) => {
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const isSlack = integration.id === "slack_integration" || integration.id === "stack_integration";

  useEffect(() => {
    const fetchFromDummyDB = () => {
      setIsLoading(true);
      setTimeout(() => {
        const storageKey = `db_config_${integration.id}`;
        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
          setFormData(JSON.parse(savedData));
        } else {
          if (isSlack) {
            setFormData({
              CLIENT_ID: "",
              CLIENT_SECRET: "",
              ACCESS_TOKEN: "",
              CHANNEL_NAME: "",
            });
          } else {
            setFormData({
              API_URL: "https://api.boomi.com/partner/api/rest/v1",
              API_ACCOUNT_ID: "esharesearchllcdbatrustwe-XXXXXX",
              API_USERNAME: "BOOMI_TOKEN.user@trustwell.com",
              API_TOKEN: "dummy-token-12345678-abcd-efgh",
            });
          }
        }
        setIsLoading(false);
      }, 400);
    };

    fetchFromDummyDB();
  }, [integration.id, isSlack]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    setSaveStatus(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving...");

    setTimeout(() => {
      const storageKey = `db_config_${integration.id}`;
      localStorage.setItem(storageKey, JSON.stringify(formData));
      setSaveStatus("saved!");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 600);
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
              <h1 className="text-xl font-bold text-gray-900">
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
              ) : (
                <DefaultDetails formData={formData} handleChange={handleChange} />
              )}

              <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-200 mt-2">
                {saveStatus === "saved!" && (
                  <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    ✓ Saved successfully!
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
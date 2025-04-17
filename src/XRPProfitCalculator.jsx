import { useState } from "react";

export default function XRPProfitCalculator() {
  const [xrpHeld, setXrpHeld] = useState(2896.39);
  const [avgPrice, setAvgPrice] = useState(2.46);
  const [customPrice, setCustomPrice] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  const futurePrices = [2.5, 5, 10, 15, 25];
  const allPrices = showCustom && customPrice > 0 ? [...futurePrices, parseFloat(customPrice)] : futurePrices;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">XRP Profit Calculator</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">XRP Held</label>
          <input
            type="number"
            value={xrpHeld}
            onChange={(e) => setXrpHeld(parseFloat(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Avg Buy Price ($)</label>
          <input
            type="number"
            value={avgPrice}
            onChange={(e) => setAvgPrice(parseFloat(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Custom Future Price ($)</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
          <button
            onClick={() => setShowCustom(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Future Price ($)</th>
            <th className="p-2 border">Value ($)</th>
            <th className="p-2 border">Profit/Loss ($)</th>
            <th className="p-2 border">ROI (%)</th>
          </tr>
        </thead>
        <tbody>
          {allPrices.map((price) => {
            const value = (xrpHeld * price).toFixed(2);
            const profit = (xrpHeld * price - xrpHeld * avgPrice).toFixed(2);
            const roi = (((price - avgPrice) / avgPrice) * 100).toFixed(2);
            const isBreakeven = parseFloat(profit) >= 0 && parseFloat(profit) < 100;

            return (
              <tr key={price} className={isBreakeven ? "bg-yellow-100 font-semibold" : ""}>
                <td className="p-2 border">${price.toFixed(2)}</td>
                <td className="p-2 border">${value}</td>
                <td className="p-2 border">${profit}</td>
                <td className="p-2 border">{roi}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
//   FileUp, 
  LogOut, 
//   ChevronRight, 
  // History 
} from 'lucide-react';

const DeliveryDashboard: React.FC = () => {
  // Стан для форми розрахунку податків
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [subtotal, setSubtotal] = useState('');
  
  // Стан для випадаючого меню адміна
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  // 1. Запобігаємо відкриттю файлу в браузері за замовчуванням
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // 2. Обробка самого файлу
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files[0]); // Ваша функція для обробки файлу
    }
  };

  const handleFiles = (file) => {
    console.log("Файл отримано:", file.name);
    // Тут логіка завантаження або читання CSV
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0f1d] p-6 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-12">
                <span className="text-blue-500 font-bold text-2xl">IWK</span>
                <span className="text-[8px] uppercase tracking-widest text-slate-500 mt-1 ml-8">
                    New York State Delivery
                </span>
            </div>
          
          <nav className="flex-1 space-y-6">
            <div className="cursor-pointer underline hover:text-white transition-colors">
                <p className="text-xl font-medium">Order/Import CSV</p>
            </div>
            <div className="cursor-pointer text-slate-400 hover:text-white transition-colors">
                <p className="text-xl font-medium border-l-2 border-transparent">Your Orders</p>
            </div>
            </nav>
        </div>

        {/* Admin Section with Logout Logic */}
        <div className="relative">
          {isAdminOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1e293b] rounded-lg shadow-xl border border-slate-700 overflow-hidden">
              <button 
                onClick={() => alert('Logging out...')}
                className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 text-red-400 transition-colors"
              >
                <LogOut size={18} />
                <span>Вийти</span>
              </button>
            </div>
          )}
          <div 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-slate-400">Admin</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex gap-8 items-start justify-center">
        
        {/* Delivery Coordinates Card */}
        <form className="w-full max-w-sm bg-[#1e293b]/40 p-6 rounded-xl border border-slate-800 shadow-2xl">
          <h2 className="text-xl text-white mb-6">Delivery Coordinates</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm">Lat:</label>
              <input 
                type="text" 
                placeholder="-72 or close"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="bg-white text-slate-900 p-2 rounded w-32 outline-none focus:ring-2 ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm">Long:</label>
              <input 
                type="text" 
                placeholder="40 or close"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                className="bg-white text-slate-900 p-2 rounded w-32 outline-none focus:ring-2 ring-blue-500"
              />
            </div>

            <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
              <MapPin size={16} />
              Send your location
            </button>

            <div className="pt-4 border-t border-slate-700">
              <label className="text-sm block mb-2">Package subtotal</label>
              <input 
                type="text" 
                placeholder="Before taxes"
                value={subtotal}
                onChange={(e) => setSubtotal(e.target.value)}
                className="w-full bg-white text-slate-900 p-2 rounded outline-none"
              />
            </div>

            <button className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-2 rounded-lg transition-colors">
              Calculate tax
            </button>

            <div className="text-sm space-y-1 py-2">
              <p className="text-slate-400">Composite tax rate: ...</p>
              <ul className="list-disc list-inside pl-2 text-slate-500">
                <li>State tax: ...</li>
                <li>County tax: ...</li>
                <li>City tax: ...</li>
                <li>Special tax: ...</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-red-800/80 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                Cancel
              </button>
              <button className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-lg transition-colors">
                Save
              </button>
            </div>
          </div>
        </form>

        {/* Import CSV Card */}
        <form 
        className="w-full max-w-md bg-[#1e293b]/40 p-6 rounded-xl border border-slate-800 shadow-2xl min-h-[500px] flex flex-col">
          <h2 className="text-2xl text-white mb-10">Import CSV</h2>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 group transition-colors cursor-pointer
              ${isDragging ? 'border-blue-500 bg-blue-50/10' : 'border-slate-700'} 
              hover:border-blue-500`}
          >
            <p className="text-slate-400 mb-4 text-lg">Drop CSV file here</p>
            <div className="text-slate-600 group-hover:text-blue-500 transition-colors">
              <Plus size={80} strokeWidth={1} />
            </div>
            <p className="mt-8 text-slate-400">
              Or click <label htmlFor="file-upload" className="text-blue-400 underline cursor-pointer">here</label> to browse
              <input type="file" id="file-upload" className='hidden'></input>
            </p>
          </div>

          <div className="flex gap-4 mt-10">
            <button className="flex-1 bg-red-800/80 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
              Cancel
            </button>
            <button className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-lg transition-colors">
              Process
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default DeliveryDashboard;
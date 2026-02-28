import React, { useState, useRef } from 'react';
// TODO: Add search function

// Типізація для даних замовлення
interface Order {
  id: string;
  long: string;
  lat: string;
  subtotal: number;
  taxRate: number;
  taxAmt: number;
  total: number;
  status: 'In progress' | 'Completed' | 'Pending';
  timestamp: string;
}

const Orders: React.FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        // Тут логіка очищення токенів або редіректу
        alert("Ви вийшли з системи");
    };

    // Тестові дані (дублюємо для візуалізації списку)
    const mockOrder: Order = {
        id: "1",
        long: "-78.86718664",
        lat: "42.01246326",
        subtotal: 120,
        taxRate: 8.875,
        taxAmt: 10.65,
        total: 130.65,
        status: "In progress",
        timestamp: "2025-11-04 10:17:05"
    };

    const [allOrders] = useState<Order[]>(() => 
        Array(28).fill(null).map((_, index) => ({
            ...mockOrder,
            id: (index + 1).toString(),
        }))
    );

    // Стан для відображення
    const [displayOrders, setDisplayOrders] = useState<Order[]>(allOrders);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Скільки замовлень показувати на одній сторінці

    // Пошук замовлення/замовлень
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleEnter = (e: React.KeyboardEvent) => {
        if(e.key == "Enter"){
            filterOrders();
        }
    }
    const inputRef = useRef<HTMLInputElement>(null); // Search-bar input
    // Функція пошуку
    const filterOrders = () => {
        const query = inputRef.current?.value.toLowerCase() || "";
        
        const filtered = allOrders.filter(order => 
            order.id.toLowerCase().includes(query)
        );

        setDisplayOrders(filtered);
        setCurrentPage(1); // Обов'язково повертаємо на 1 сторінку
    };

    // Логіка розрахунку індексів
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = displayOrders.slice(indexOfFirstItem, indexOfLastItem);
    
    // Загальна кількість сторінок
    const totalPages = Math.ceil(displayOrders.length / itemsPerPage);

    return (
    <div className="flex h-screen bg-[#0f121d] text-slate-300 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-[#141827] flex flex-col p-6">
            <div className="flex items-center gap-2 mb-12">
                <span className="text-blue-500 font-bold text-2xl">IWK</span>
                <span className="text-[8px] uppercase tracking-widest text-slate-500 mt-1 ml-8">
                    New York State Delivery
                </span>
            </div>

            <nav className="flex-1 space-y-6">
            <div className="cursor-pointer text-slate-400 hover:text-white transition-colors">
                <p className="text-xl font-medium">
                    <a href="neworder">
                        Order/Import CSV
                    </a>
                </p>
            </div>
            <div className="cursor-pointer underline hover:text-white transition-colors">
                <p className="text-xl font-medium border-l-2 border-transparent">Your Orders</p>
            </div>
            </nav>

            {/* Контейнер адміна */}
            <div className="relative mt-auto">
                {/* Випадаюче меню (з'являється над блоком) */}
                {isUserMenuOpen && (
                    <a href="../">
                        <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1a1f30] border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                        >
                            <span>Вийти з облікового запису</span>
                        </button>
                        </div>
                    </a>
                )}

                {/* Сама кнопка адміна */}
                <div 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                    isUserMenuOpen ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                    }`}
                >
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shrink-0">
                    <span className="font-bold">A</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate text-white">Admin</p>
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Orders Dashboard</h1>
                    <p className="text-slate-500">New York State - Drone Delivery Network</p>
                </div>

                <div className="relative flex items-center">
                    <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleEnter}
                    placeholder="Search by id"
                    className="bg-[#1a1f30] border-none rounded-l-lg py-2.5 px-4 w-80 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                    />
                    <button type='submit' onClick={filterOrders} className="bg-[#3f51b5] hover:bg-[#4c5ed1] text-white px-6 py-2.5 rounded-r-lg text-sm font-medium transition-colors">
                        Search
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#1a1f30]/40 rounded-3xl p-6 backdrop-blur-sm border border-slate-800/50">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-wider">
                            <th className="px-4 pb-2 font-medium">Order ID</th>
                            <th className="px-4 pb-2 font-medium">Coordinates</th>
                            <th className="px-4 pb-2 font-medium">Subtotal</th>
                            <th className="px-4 pb-2 font-medium">Tax Rate</th>
                            <th className="px-4 pb-2 font-medium">TaxAmt</th>
                            <th className="px-4 pb-2 font-medium">Total</th>
                            <th className="px-4 pb-2 font-medium">Status</th>
                            <th className="px-4 pb-2 font-medium">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentOrders.map((order, idx) => (
                        <tr 
                        key={idx} 
                        className="bg-[#242a42]/60 hover:bg-[#2d3554] transition-colors group cursor-pointer"
                        >
                            <td className="px-4 py-4 rounded-l-xl font-bold text-white">{order.id}</td>
                            <td className="px-4 py-4 text-[11px] leading-relaxed">
                                <div className="text-slate-400">long: {order.long}</div>
                                <div className="text-slate-400">lat: {order.lat}</div>
                            </td>
                            <td className="px-4 py-4 text-slate-300">{order.subtotal}$</td>
                            <td className="px-4 py-4 text-slate-300">{order.taxRate}%</td>
                            <td className="px-4 py-4 text-slate-300">{order.taxAmt}$</td>
                            <td className="px-4 py-4 font-semibold text-slate-200">{order.total}$</td>
                            <td className="px-4 py-4">
                                <span className="text-slate-300">{order.status}</span>
                            </td>
                            <td className="px-4 py-4 rounded-r-xl text-slate-400 text-sm">
                                {order.timestamp}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
                            ${page === currentPage 
                            ? 'bg-indigo-600 text-white shadow-lg' 
                            : 'bg-slate-800/50 text-slate-500 hover:bg-slate-700'
                            }`}
                        >
                        {page}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    </div>
    );
}

export default Orders
import React, { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("loading");

 
  const API_URL = 'https://beeceptor.com/crud-api/tasks';

  // 1. Fetch Data 
  useEffect(() => {
    const loadInitialData = async () => {
      try {
      
        const res = await fetch(API_URL).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          setList(Array.isArray(data) ? data : []);
        } else {
          
          setList([]);
        }
      } catch (e) {
        setList([]);
      } finally {
        setStatus("ready");
      }
    };
    loadInitialData();
  }, []);

  // 2. Add Task 
  const addItem = (e) => {
    e.preventDefault();
    if (!val.trim()) return;

    const newTask = { id: Date.now(), todo: val };
    setList([newTask, ...list]);
    setVal("");

   
    fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).catch(() => {
      
    });
  };

  // 3. Delete Task
  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
    fetch(`${API_URL}/${id}`, { method: 'DELETE', mode: 'no-cors' }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        <div className="bg-[#2563eb] p-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight">Vayuz Project</h1>
          <p className="text-blue-100 text-[11px] uppercase font-bold tracking-[0.2em] mt-2">
            Task Dashboard System
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={addItem} className="flex gap-2 mb-8">
            <input 
              type="text" 
              className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
              placeholder="Enter new task..."
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            <button type="submit" className="bg-[#2563eb] text-white px-6 rounded-2xl font-bold hover:bg-blue-700 active:scale-95 transition-all">
              Add
            </button>
          </form>

          <div className="space-y-3 min-h-[200px]">
            {status === "loading" ? (
              <p className="text-center text-gray-300 animate-pulse">Syncing...</p>
            ) : list.length === 0 ? (
              <p className="text-center py-10 text-gray-300 italic text-sm">List is empty</p>
            ) : (
              list.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <span className="text-gray-700 font-medium">{item.todo}</span>
                  <button onClick={() => deleteItem(item.id)} className="text-red-400 text-[10px] font-bold hover:text-red-600">DELETE</button>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            <span>Status: Online</span>
            <span>By Sagar Bhati</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
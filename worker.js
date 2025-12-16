// 2025.12.9 Co-Creation
// CloudBox Classic v3.1: 修复幽灵弹窗bug + 禁止自动弹出 + 样式加固

const HTML_UI = `
<!DOCTYPE html>
<html lang="zh-CN" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>CloudBox</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: { 'ios-bg-light': '#EAF3F7', 'ios-bg-dark': '#0f172a' },
                fontFamily: { sans: ['"SF Pro Display"', '-apple-system', 'sans-serif'], mono: ['"JetBrains Mono"', 'monospace'] },
                animation: { 
                    'fade-in': 'fadeIn 0.3s ease-out', 
                    'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                },
                keyframes: {
                    fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                    slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                }
            }
        }
    }
</script>
<!-- 关键修复：添加 type="text/tailwindcss" 以支持 @apply -->
<style type="text/tailwindcss">
    /* 核心背景 */
    body { background-color: #0f172a; color: #e2e8f0; -webkit-tap-highlight-color: transparent; transition: background-color 0.5s ease; font-size: 13px; }
    html:not(.dark) body { background-color: #EAF3F7; color: #334155; }
    
    /* 玻璃面板 */
    .glass-panel {
        background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); 
        border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    html:not(.dark) .glass-panel {
        background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255, 255, 255, 1);
        box-shadow: 0 20px 40px -10px rgba(148, 163, 184, 0.15);
    }

    /* 输入框 */
    .glass-input { background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.08); color: white; transition: all 0.3s; font-size: 12px; }
    html:not(.dark) .glass-input { background: white; border: 1px solid #cbd5e1; color: #334155; }
    .glass-input:focus { border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15); }

    /* 标题颜色适配 */
    .app-title {
        @apply text-2xl font-bold tracking-tight bg-clip-text text-transparent;
        background-image: linear-gradient(to right, #fff, #94a3b8);
    }
    html:not(.dark) .app-title {
        background: none; 
        color: #0f172a !important;
        -webkit-text-fill-color: #0f172a;
    }

    /* 按钮 - 通用 */
    .icon-btn { 
        @apply w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border cursor-pointer relative overflow-hidden;
    }
    .dark .icon-btn { 
        @apply bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20; 
    }
    html:not(.dark) .icon-btn { 
        @apply bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm; 
    }
    .icon-btn:active { transform: scale(0.92); }

    /* 上传按钮 (极简透明版) */
    .btn-upload-minimal {
        @apply px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all duration-200 cursor-pointer border border-transparent;
    }
    .dark .btn-upload-minimal { 
        @apply text-slate-200 hover:bg-white/10 hover:text-white; 
    }
    html:not(.dark) .btn-upload-minimal { 
        @apply text-slate-600 hover:bg-black/5 hover:text-blue-600; 
    }
    .btn-upload-minimal:active { transform: scale(0.95); }

    /* 列表行 */
    .file-row { 
        padding: 8px 12px; 
        border-bottom: 1px solid rgba(255,255,255,0.03); 
        transition: all 0.2s; border-radius: 8px; margin-bottom: 2px;
    }
    .file-row:hover { background: rgba(255,255,255,0.05); }
    html:not(.dark) .file-row { border-bottom: 1px solid rgba(0,0,0,0.04); }
    html:not(.dark) .file-row:hover { background: rgba(255,255,255,0.6); }

    /* 链接特效 */
    .link-effect { position: relative; text-decoration: none; }
    .link-effect::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -1px; left: 0; background-color: currentColor; transition: width 0.3s ease-out; opacity: 0.6; }
    .file-row:hover .link-effect::after { width: 100%; }

    /* 模式切换器 */
    .mode-toggle { background: rgba(0, 0, 0, 0.2); border-radius: 12px; padding: 4px; display: flex; position: relative; cursor: pointer; border: 1px solid rgba(255,255,255,0.05); }
    html:not(.dark) .mode-toggle { background: #f1f5f9; border-color: #e2e8f0; }
    .mode-option { padding: 6px 16px; border-radius: 10px; font-size: 12px; font-weight: 600; z-index: 2; transition: color 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .mode-active-bg { position: absolute; top: 4px; left: 4px; height: calc(100% - 8px); width: 50%; background: rgba(255,255,255,0.1); border-radius: 10px; transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); z-index: 1; border: 1px solid rgba(255,255,255,0.05); }
    html:not(.dark) .mode-active-bg { background: white; border-color: transparent; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

    /* 关键修复：确保弹窗默认隐藏 */
    .modal-backdrop { @apply fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm hidden animate-fade-in; }

    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 99px; }
    .truncate-mid { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-all; }
</style>
</head>
<body class="min-h-screen flex items-center justify-center transition-colors font-sans">

<div class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
</div>

<div class="w-full max-w-[520px] h-[80vh] glass-panel rounded-[2rem] flex flex-col overflow-hidden animate-slide-up mx-4 shadow-2xl relative ring-1 ring-white/5">
    
    <header class="h-16 flex items-center justify-between px-6 shrink-0 border-b border-white/5 dark:border-white/5 border-black/5">
        <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md text-sm">
                <i class="fas fa-cloud"></i>
            </div>
            <div>
                <h1 class="app-title">CloudBox</h1>
                <p class="text-[10px] font-medium opacity-40 uppercase tracking-widest -mt-0.5">Classic</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button onclick="toggleSettings()" class="icon-btn" title="设置密码"><i class="fas fa-cog text-xs"></i></button>
            <button onclick="toggleTheme()" class="icon-btn"><i class="fas fa-moon text-xs dark:hidden text-yellow-500"></i><i class="fas fa-sun text-xs hidden dark:block text-yellow-300"></i></button>
        </div>
    </header>

    <div class="px-5 py-4 flex items-center justify-between gap-4">
        <div class="mode-toggle flex-1" onclick="toggleMode()">
            <div id="mode-bg" class="mode-active-bg"></div>
            <div class="mode-option w-1/2 text-slate-500" id="opt-temp"><i class="fas fa-hourglass-half text-[10px]"></i> 临时</div>
            <div class="mode-option w-1/2 text-slate-500" id="opt-perm"><i class="fas fa-save text-[10px]"></i> 永久</div>
        </div>

        <label class="btn-upload-minimal">
            <i class="fas fa-plus text-sm"></i>
            <span>上传文件</span>
            <input type="file" class="hidden" multiple onchange="uploadFiles(this)">
        </label>
    </div>

    <div class="px-6 pb-2 flex items-center justify-between opacity-40 text-[10px] font-bold uppercase tracking-widest">
        <span>Files</span>
        <div class="flex items-center gap-2">
            <span id="file-count">0</span> Items
            <button onclick="refreshList()" class="hover:text-blue-400 transition-colors cursor-pointer"><i class="fas fa-sync-alt" id="refresh-icon"></i></button>
        </div>
    </div>

    <div class="flex-1 overflow-y-auto px-3 pb-6 relative" id="file-list-container">
        <div id="file-list" class="space-y-0.5"></div>
        <div id="empty-state" class="hidden absolute inset-0 flex flex-col items-center justify-center opacity-30 pb-10 pointer-events-none">
            <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                <i class="fas fa-inbox text-2xl opacity-70"></i>
            </div>
            <span class="text-[10px] tracking-wider font-medium">暂无文件</span>
        </div>
    </div>

</div>

<!-- 密码弹窗 (默认隐藏) -->
<div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm hidden animate-fade-in">
    <div class="glass-panel w-full max-w-xs rounded-2xl p-5 flex flex-col gap-3 shadow-2xl m-4 border-t border-white/10">
        <h3 class="text-sm font-bold text-center">身份验证</h3>
        <p class="text-[10px] text-center opacity-60">请输入 Cloudflare 设置的 AUTH_SECRET</p>
        <input type="password" id="auth-key-input" class="glass-input w-full rounded-lg px-3 py-2.5 text-center tracking-widest" placeholder="访问密码">
        <div class="flex gap-2 mt-1">
            <button onclick="toggleSettings()" class="flex-1 py-2 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors opacity-70">取消</button>
            <button onclick="saveAuthKey()" class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg">确认</button>
        </div>
    </div>
</div>

<!-- 重命名弹窗 (默认隐藏) -->
<div id="rename-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm hidden animate-fade-in">
    <div class="glass-panel w-full max-w-xs rounded-2xl p-5 flex flex-col gap-3 shadow-2xl m-4 border-t border-white/10">
        <h3 class="text-sm font-bold text-center">重命名</h3>
        <input type="text" id="rename-input" class="glass-input w-full rounded-lg px-3 py-2.5 text-center text-xs" placeholder="新文件名">
        <div class="flex gap-2 mt-1">
            <button onclick="closeRenameModal()" class="flex-1 py-2 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors opacity-70">取消</button>
            <button onclick="confirmRename()" class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg">确认</button>
        </div>
    </div>
</div>

<div id="toast" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-2 rounded-full glass-panel flex items-center gap-2 shadow-2xl transition-all duration-300 translate-y-[-200%] opacity-0 pointer-events-none">
    <div class="w-1.5 h-1.5 rounded-full bg-green-500" id="toast-dot"></div>
    <span id="toast-msg" class="text-xs font-medium tracking-wide">Notification</span>
</div>

<script>
    let authKey = localStorage.getItem('cb_auth_key') || '';
    let currentMode = localStorage.getItem('cb_last_mode') || 'temp'; 
    let deletedFiles = new Set();
    let currentRenameTarget = null;

    window.onload = () => {
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else { document.documentElement.classList.remove('dark'); }
        
        updateModeUI();
        // 关键修改：取消自动弹窗，只有当有 key 时才刷新列表
        if(authKey) refreshList();
    };

    function toggleMode() {
        currentMode = currentMode === 'temp' ? 'perm' : 'temp';
        localStorage.setItem('cb_last_mode', currentMode);
        updateModeUI();
        if(authKey) refreshList();
    }

    function updateModeUI() {
        const bg = document.getElementById('mode-bg');
        const tOpt = document.getElementById('opt-temp');
        const pOpt = document.getElementById('opt-perm');
        
        if (currentMode === 'perm') {
            bg.style.transform = 'translateX(100%)';
            pOpt.classList.add('text-blue-600', 'dark:text-blue-400');
            tOpt.classList.remove('text-blue-600', 'dark:text-blue-400');
        } else {
            bg.style.transform = 'translateX(0)';
            tOpt.classList.add('text-blue-600', 'dark:text-blue-400');
            pOpt.classList.remove('text-blue-600', 'dark:text-blue-400');
        }
    }

    function toggleSettings() {
        const el = document.getElementById('settings-modal');
        el.classList.toggle('hidden');
        if(!el.classList.contains('hidden')) {
            document.getElementById('auth-key-input').value = authKey;
            document.getElementById('auth-key-input').focus();
        }
    }
    function saveAuthKey() {
        const val = document.getElementById('auth-key-input').value.trim();
        if(!val) return showToast('请输入密码', 'error');
        authKey = val;
        localStorage.setItem('cb_auth_key', val);
        toggleSettings();
        refreshList();
    }

    async function refreshList() {
        if(!authKey) return;
        const icon = document.getElementById('refresh-icon');
        icon.classList.add('fa-spin');
        const listEl = document.getElementById('file-list');
        
        try {
            const res = await fetch(\`/api/list?mode=\${currentMode}\`, { headers: { 'x-auth-key': authKey } });
            if(res.status === 401) {
                authKey = ''; localStorage.removeItem('cb_auth_key'); 
                showToast("密码错误", "error");
                // 密码错也只提示，不自动弹窗干扰
                icon.classList.remove('fa-spin');
                return;
            }
            
            const files = await res.json();
            listEl.innerHTML = '';
            let count = 0;

            files.forEach(f => {
                if(deletedFiles.has(f.key)) return;
                insertFileRow(f);
                count++;
            });

            document.getElementById('file-count').textContent = count;
            if(count === 0) document.getElementById('empty-state').classList.remove('hidden');
            else document.getElementById('empty-state').classList.add('hidden');

        } catch(e) { showToast('加载失败', 'error'); }
        icon.classList.remove('fa-spin');
    }

    async function uploadFiles(input) {
        if(input.files.length === 0) return;
        // 如果没有密码，点击上传时才弹窗
        if(!authKey) return toggleSettings();
        
        const files = Array.from(input.files);
        const total = files.length;
        let successCount = 0;

        showToast(\`正在上传 \${total} 个文件...\`, 'info');

        const uploadPromises = files.map(file => {
            return fetch('/api/upload', {
                method: 'PUT',
                headers: {
                    'x-auth-key': authKey,
                    'x-storage-mode': currentMode,
                    'x-original-name': encodeURIComponent(file.name),
                    'Content-Type': file.type
                },
                body: file
            }).then(async res => {
                if(res.ok) {
                    successCount++;
                    const data = await res.json();
                    const newFile = {
                        key: data.key,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        uploadedAt: Date.now()
                    };
                    insertFileRow(newFile, true); 
                }
            }).catch(e => console.error(e));
        });

        await Promise.all(uploadPromises); 
        
        if(successCount === total) showToast(\`全部上传成功\`);
        else showToast(\`完成: \${successCount}/\${total}\`, 'error');
        
        input.value = ''; 
        document.getElementById('empty-state').classList.add('hidden');
        
        const cEl = document.getElementById('file-count');
        cEl.textContent = parseInt(cEl.textContent) + successCount;
    }

    function openRenameModal(key, elId, oldName) {
        currentRenameTarget = { key, elId, oldName };
        document.getElementById('rename-input').value = oldName;
        document.getElementById('rename-modal').classList.remove('hidden');
        document.getElementById('rename-input').focus();
    }
    function closeRenameModal() { document.getElementById('rename-modal').classList.add('hidden'); }
    
    async function confirmRename() {
        const newName = document.getElementById('rename-input').value.trim();
        if(!newName || !currentRenameTarget) return;
        const { key, elId } = currentRenameTarget;
        closeRenameModal();
        showToast('修改中...', 'info');

        try {
            const res = await fetch('/api/rename', {
                method: 'POST',
                headers: { 'x-auth-key': authKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, newName })
            });
            if(res.ok) {
                showToast('修改成功');
                const row = document.getElementById(elId);
                if(row) {
                    row.querySelector('.file-name-link').textContent = newName;
                }
                setTimeout(refreshList, 500); 
            } else {
                showToast('修改失败 (可能重名)', 'error');
            }
        } catch(e) { showToast('网络错误', 'error'); }
    }

    async function deleteFile(key, elId) {
        if(!confirm('确定删除?')) return;
        const row = document.getElementById(elId);
        if(row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(20px)';
            setTimeout(() => row.remove(), 200);
        }
        deletedFiles.add(key);
        const countEl = document.getElementById('file-count');
        const c = parseInt(countEl.textContent);
        if(c > 0) countEl.textContent = c - 1;

        try {
            await fetch('/api/delete', {
                method: 'DELETE',
                headers: { 'x-auth-key': authKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: key })
            });
        } catch(e) { showToast('Error', 'error'); }
    }

    function insertFileRow(f, prepend = false) {
        const listEl = document.getElementById('file-list');
        const elId = 'file-' + Math.random().toString(36).substr(2, 9);
        const row = document.createElement('div');
        row.id = elId;
        row.className = 'file-row flex items-center justify-between group cursor-default animate-fade-in';
        
        const sizeStr = formatSize(f.size);
        const iconClass = getFileIcon(f.name);
        const url = location.origin + '/' + f.key;
        const iconBg = "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400";
        const displayName = f.name;

        row.innerHTML = \`
            <div class="flex items-center gap-3 min-w-0 overflow-hidden w-full">
                <div class="w-8 h-8 rounded-lg \${iconBg} flex items-center justify-center shrink-0 text-xs shadow-sm">
                    <i class="fas \${iconClass}"></i>
                </div>
                <div class="min-w-0 flex-1 flex flex-col justify-center">
                    <a href="\${url}" target="_blank" class="text-[12px] font-medium truncate text-slate-700 dark:text-slate-200 link-effect file-name-link" style="width:fit-content" title="\${displayName}">\${displayName}</a>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[9px] opacity-40 font-mono tracking-wide">\${sizeStr}</span>
                        <span class="text-[9px] opacity-30">•</span>
                        <span class="text-[9px] opacity-40 font-mono">\${new Date(f.uploadedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <button onclick="copyLink('\${url}')" class="icon-btn btn-copy hover:!border-blue-500/30 hover:!text-blue-500" title="复制链接"><i class="fas fa-link text-[10px]"></i></button>
                <button onclick="openRenameModal('\${f.key}', '\${elId}', '\${displayName}')" class="icon-btn hover:!border-blue-500/30 hover:!text-blue-500" title="修改文件名"><i class="fas fa-pen text-[10px]"></i></button>
                <button onclick="deleteFile('\${f.key}', '\${elId}')" class="icon-btn hover:!border-red-500/30 hover:!text-red-500" title="删除"><i class="fas fa-trash text-[10px]"></i></button>
            </div>
        \`;
        if(prepend) listEl.prepend(row); else listEl.appendChild(row);
    }

    function formatSize(b) { if(!b)return'0 B'; const k=1024, s=['B','KB','MB','GB'], i=Math.floor(Math.log(b)/Math.log(k)); return parseFloat((b/Math.pow(k,i)).toFixed(1))+' '+s[i]; }
    function getFileIcon(n) { const e=n.split('.').pop().toLowerCase(); if(['jpg','jpeg','png','gif','webp'].includes(e))return'fa-image'; if(['mp4','mov','avi'].includes(e))return'fa-video'; if(['mp3','wav'].includes(e))return'fa-music'; if(['zip','rar','7z'].includes(e))return'fa-file-archive'; if(['json','txt','md','js'].includes(e))return'fa-file-code'; return 'fa-file'; }
    function copyLink(t) { navigator.clipboard.writeText(t).then(()=>showToast('已复制')); }
    function toggleTheme() { const h=document.documentElement; if(h.classList.contains('dark')){h.classList.remove('dark');localStorage.setItem('theme','light')}else{h.classList.add('dark');localStorage.setItem('theme','dark')} }
    function showToast(m,t='success') { 
        const x=document.getElementById('toast'); 
        const d=document.getElementById('toast-dot');
        document.getElementById('toast-msg').textContent=m; 
        d.className = t==='success' ? 'w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
        x.style.opacity='1'; x.style.transform='translate(-50%,0)'; 
        setTimeout(()=>{x.style.opacity='0';x.style.transform='translate(-50%,-200%)'},2500); 
    }
</script>
</body>
</html>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' };
    
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (path === '/' || path === '/index.html') return new Response(HTML_UI, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });

    try {
      if (!env.MY_KV) throw new Error("KV未绑定");
      const MY_SECRET = env.AUTH_SECRET || "123456";
      const authKey = request.headers.get('x-auth-key');
      const checkAuth = () => { if(authKey !== MY_SECRET) throw new Error("密码错误"); };

      // Upload
      if (path === '/api/upload' && request.method === 'PUT') {
        checkAuth();
        const mode = request.headers.get('x-storage-mode') === 'perm' ? 'save' : 'temp';
        const originalName = decodeURIComponent(request.headers.get('x-original-name') || 'unknown');
        const ext = originalName.split('.').pop();
        
        // 8位短链
        const shortId = Math.random().toString(36).slice(2, 10);
        const shortName = `${shortId}.${ext}`;
        const key = `${mode}/${shortName}`; 
        
        const value = await request.arrayBuffer();
        const type = request.headers.get('Content-Type') || 'application/octet-stream';
        
        const metadata = { 
            originalName: originalName, 
            size: value.byteLength, 
            type: type, 
            uploadedAt: Date.now() 
        };

        const options = { metadata };
        if (mode === 'temp') options.expirationTtl = 259200; 
        
        await env.MY_KV.put(key, value, options);
        return new Response(JSON.stringify({ status: 'ok', key }), { headers: corsHeaders });
      }
      
      // Rename
      if (path === '/api/rename' && request.method === 'POST') {
        checkAuth();
        const { key, newName } = await request.json();
        const { value, metadata } = await env.MY_KV.getWithMetadata(key, { type: 'arrayBuffer' });
        if (!value) throw new Error("文件不存在");
        
        const newMeta = { ...metadata, originalName: newName };
        const mode = key.split('/')[0];
        const options = { metadata: newMeta };
        if (mode === 'temp') options.expirationTtl = 259200; 
        
        await env.MY_KV.put(key, value, options);
        return new Response(JSON.stringify({ status: 'ok' }), { headers: corsHeaders });
      }

      // List (20s Cache)
      if (path === '/api/list') {
        checkAuth();
        const mode = new URL(request.url).searchParams.get('mode') === 'perm' ? 'save' : 'temp';
        const list = await env.MY_KV.list({ prefix: mode + '/' });
        const files = list.keys.map(k => ({
            key: k.name,
            name: k.metadata?.originalName || k.name.replace(mode + '/', ''),
            size: k.metadata?.size || 0,
            uploadedAt: k.metadata?.uploadedAt || 0
        })).sort((a, b) => b.uploadedAt - a.uploadedAt);
        const headers = { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=20' };
        return new Response(JSON.stringify(files), { headers });
      }

      // Delete
      if (path === '/api/delete') {
          checkAuth();
          const { key } = await request.json();
          await env.MY_KV.delete(key);
          return new Response(JSON.stringify({ status: 'ok' }), { headers: corsHeaders });
      }

      // Download
      if (!path.startsWith('/api/')) {
          const key = path.slice(1);
          const { value, metadata } = await env.MY_KV.getWithMetadata(key, { type: 'arrayBuffer' });
          if (!value) return new Response("404 Not Found", { status: 404 });
          const h = new Headers();
          h.set('Content-Type', metadata?.type || 'application/octet-stream');
          h.set('Access-Control-Allow-Origin', '*');
          h.set('Cache-Control', 'public, max-age=86400');
          return new Response(value, { headers: h });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch(e) { return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders }); }
  }
};

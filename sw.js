importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:'AIzaSyAitQuUaqZ4a0662VVVl_UvbTpliBAD434',authDomain:'shehabpharamcyapp.firebaseapp.com',projectId:'shehabpharamcyapp',storageBucket:'shehabpharamcyapp.firebasestorage.app',messagingSenderId:'152350818232',appId:'1:152350818232:web:60a0f7e6fc12d5601f594d'});
const fcm=firebase.messaging();
fcm.onBackgroundMessage(payload=>{if(payload.notification)return;const d=payload.data||{},title=d.title||'صيدليات شهاب',options={body:d.body||'لديك تحديث جديد',icon:'icon-192.png',data:{url:(payload.fcmOptions&&payload.fcmOptions.link)||'https://amersn.github.io/shehabpharmacies/'}};return self.registration.showNotification(title,options)});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=e.notification.data&&e.notification.data.url||'https://amersn.github.io/shehabpharmacies/';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(xs=>{for(const c of xs){if(c.url.startsWith('https://amersn.github.io/shehabpharmacies/'))return c.focus().then(()=>c.navigate(url))}return clients.openWindow(url)}))});
const C='shehab-v2-fcm',F=['./','index.html','config.js','logo.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});

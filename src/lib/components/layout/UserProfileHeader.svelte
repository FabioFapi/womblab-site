<script>
    export let user = { name: 'Nome Cognome', email: 'email@example.com' };
  </script>
  
  <div class="p-4 border-b flex items-center space-x-3">
    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
      {user.name?.[0] ?? 'U'}
    </div>
    <div>
      <p class="font-semibold text-sm">{user.name}</p>
      <p class="text-xs text-gray-500">{user.email}</p>
    </div>
  </div>
mysql baza na dokeru: 

docker compose-up u folderu sa docker-compose fajlom

backend laravel: 

cd ../back
composer install (instalira pakete pri prvom pokretanju)
env povezati sa bazom
php artisan migrate:fresh --seed (prvi put inicijalizacija i seedovanje baze)
php artisan serve

frontend vue: 

cd ../front
npm install (instalira pakete pri prvom pokretanju)
quasar dev

--Bugovi
Sweetalert2 obavjestenja se prikazuju iza quasarovih dialoga, mora se pomjeriti z-index, primjetno kod brisanja projekata u admin panelu ili greskama pri crud operacijama
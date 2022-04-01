mysql baza na dokeru: 

docker compose-up u folderu sa docker-compose fajlom

backend laravel: 

cd ../back
composer install (instalira pakete pri prvom pokretanju)
env povezati sa bazom
php artisan migrate (prvi put inicijalizacija baze)
php artisan serve

frontend vue: 

cd ../front
npm install (instalira pakete pri prvom pokretanju)
quasar dev
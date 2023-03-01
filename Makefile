build:
	docker build -t botgpu .

run:
	docker-compose -f docker-compose.yml  up
	
	

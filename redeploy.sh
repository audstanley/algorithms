#!/bin/bash
docker stop algorithms_algorithms_1 \
	&& docker rm algorithms_algorithms_1 \
	&& docker rmi algorithms_algorithms \
	&& docker-compose up -d;

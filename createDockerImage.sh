mv ./build ./docker
docker image build ./docker -t yhlben/react-kandian
docker push yhlben/react-kandian

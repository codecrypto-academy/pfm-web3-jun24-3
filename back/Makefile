-include .env
.PHONY: test deploy_track

help:
	@echo "Usage:"
	@echo "  make deploy_track [ARGS=...]"
	@echo "  make deploy_user_management [ARGS=...]"
	
test:; forge test

build:; forge build

NETWORK_ARGS := --rpc-url http://127.0.0.1:8545 --account anvilkey --broadcast
# if --network sepolia is used, then use sepolia stuff, otherwise use the anvil stuff
ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --account sepoliakey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

deploy_track:
	@forge script script/DeployTrack.s.sol:DeployTrack $(NETWORK_ARGS)

deploy_user_management:
	@forge script script/DeployUserManagement.s.sol:DeployUserManagement $(NETWORK_ARGS)
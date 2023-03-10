pragma solidity ^0.6.0;
import "./IExerciceSolution.sol";
import "./utils/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciceSolution is IExerciceSolution {
  IUniswapV2Router02 public router;
  ERC20  public myToken;
  ERC20  public WETH;
  ERC20  public DummyToken;
  ERC20 public UniswapLiquid;

  constructor(address _router, address _WETH,address _UniswapLiquid, address _DummyToken, address _myToken) public {
    router = IUniswapV2Router02(_router);
    myToken = ERC20(_myToken);
    WETH = ERC20(_WETH);
    DummyToken = ERC20(_DummyToken);
    UniswapLiquid = ERC20(_UniswapLiquid);
  }

  function addLiquidity() override external {
    uint256 myTokenLiquidity = 1000000;
    uint256 WETHLiquidity = 1000;
    require(myToken.approve(address(router), myTokenLiquidity),"Your token couldn't be approved");
    require(WETH.approve(address(router), WETHLiquidity),"WETH couldn't be approved");
    router.addLiquidity(address(myToken), address(WETH), myTokenLiquidity, WETHLiquidity, 0,0, address(this), block.timestamp);
  }

  function withdrawLiquidity() override external {
    uint256 liquidity = 10000;
    require(UniswapLiquid.approve(address(router), liquidity),"UniswapLiquid couldn't be approved");
    router.removeLiquidity(address(myToken), address(WETH), liquidity, 0,0, address(this), block.timestamp);
  }

  function swapYourTokenForDummyToken() override external {
    uint256 liquidity = 100000;
    require(myToken.approve(address(router), liquidity),"Your token couldn't be approved");
    require(DummyToken.approve(address(router), 100000),"Dummy token couldn't be approved");
    address[] memory path = new address[](2);
    path[0] = address(myToken);
    path[1] = address(DummyToken);
    router.swapExactTokensForTokens(liquidity, 10000, path, address(this), block.timestamp);
  }

  function swapYourTokenForEth() override external {
    uint256 liquidity = 100000;
    require(myToken.approve(address(router), liquidity),"Your token couldn't be approved");
    require(WETH.approve(address(router), 1000),"WETH couldn't be approved");
    address[] memory path = new address[](2);
    path[0] = address(myToken);
    path[1] = address(WETH);
    router.swapExactTokensForETH(liquidity, 1000, path, address(this), block.timestamp);
  }
}

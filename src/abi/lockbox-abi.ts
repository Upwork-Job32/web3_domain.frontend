export const lockboxAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'assetAddress', type: 'address' },
      { internalType: 'address', name: 'lpTokenAddress', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'AddressEmptyCode',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'AddressInsufficientBalance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ERC721EnumerableForbiddenBatchMint',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'owner', type: 'address' }
    ],
    name: 'ERC721IncorrectOwner',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'ERC721InsufficientApproval',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'approver', type: 'address' }],
    name: 'ERC721InvalidApprover',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'operator', type: 'address' }],
    name: 'ERC721InvalidOperator',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'ERC721InvalidOwner',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'ERC721InvalidReceiver',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    name: 'ERC721InvalidSender',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'ERC721OutOfBoundsIndex',
    type: 'error'
  },
  { inputs: [], name: 'EnabledAutoRelock', type: 'error' },
  { inputs: [], name: 'FailedInnerCall', type: 'error' },
  { inputs: [], name: 'MismatchUniswapPairToken', type: 'error' },
  { inputs: [], name: 'NoLPTokenOutstanding', type: 'error' },
  { inputs: [], name: 'NotOwner', type: 'error' },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error'
  },
  { inputs: [], name: 'TooManyEntries', type: 'error' },
  { inputs: [], name: 'UnexpiredLockup', type: 'error' },
  { inputs: [], name: 'WrongDuration', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'addedBy',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'resetStartTime',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountAsset',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLpToken',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'effectiveDuration',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpTokenValuation',
        type: 'uint256'
      }
    ],
    name: 'AssetsAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'newDuration',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'autoRelock',
        type: 'bool'
      }
    ],
    name: 'DurationChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'value',
        type: 'bytes'
      }
    ],
    name: 'KvUpdate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountAsset',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLpToken',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'durationSeconds',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpTokenValuation',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'autoRelock',
        type: 'bool'
      }
    ],
    name: 'LockupCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountAsset',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLpToken',
        type: 'uint256'
      }
    ],
    name: 'Unlocked',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'lockupId', type: 'uint256' },
      { internalType: 'uint256', name: 'assetToAdd', type: 'uint256' },
      { internalType: 'uint256', name: 'lpTokenToAdd', type: 'uint256' },
      { internalType: 'bool', name: 'resetStartTime', type: 'bool' },
      {
        components: [
          { internalType: 'string', name: 'key', type: 'string' },
          { internalType: 'bytes', name: 'val', type: 'bytes' }
        ],
        internalType: 'struct ILockBox.KeyVal[]',
        name: 'entriesToUpdate',
        type: 'tuple[]'
      }
    ],
    name: 'addAssets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'assetContract',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'lockupId', type: 'uint256' },
      {
        internalType: 'uint64',
        name: 'newDurationSeconds',
        type: 'uint64'
      },
      { internalType: 'bool', name: 'autoRelock', type: 'bool' },
      {
        components: [
          { internalType: 'string', name: 'key', type: 'string' },
          { internalType: 'bytes', name: 'val', type: 'bytes' }
        ],
        internalType: 'struct ILockBox.KeyVal[]',
        name: 'entriesToUpdate',
        type: 'tuple[]'
      }
    ],
    name: 'changeDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'computeLpStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'currentLpTokens',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'currentAsset', type: 'uint256' },
      { internalType: 'uint256', name: 'lastLpTokens', type: 'uint256' },
      { internalType: 'uint256', name: 'lastAsset', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'averageLpTokens',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'averageAsset', type: 'uint256' },
      { internalType: 'uint32', name: 'timestamp', type: 'uint32' },
      { internalType: 'bool', name: 'useAverage', type: 'bool' },
      { internalType: 'bool', name: 'persistUpdate', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'computeUpdateLpStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalLpTokensOutstanding',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalAssetUnitsStaked',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountAsset', type: 'uint256' },
      { internalType: 'uint256', name: 'amountLpToken', type: 'uint256' },
      { internalType: 'uint64', name: 'durationSeconds', type: 'uint64' },
      { internalType: 'bool', name: 'autoRelock', type: 'bool' },
      {
        components: [
          { internalType: 'string', name: 'key', type: 'string' },
          { internalType: 'bytes', name: 'val', type: 'bytes' }
        ],
        internalType: 'struct ILockBox.KeyVal[]',
        name: 'entriesToUpdate',
        type: 'tuple[]'
      }
    ],
    name: 'createLockup',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCurrentLpStats',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalLpTokensOutstanding',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalAssetUnitsStaked',
        type: 'uint256'
      },
      { internalType: 'uint32', name: 'timestamp', type: 'uint32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getLpStats',
    outputs: [
      { internalType: 'uint256', name: 'lastLpTokens', type: 'uint256' },
      { internalType: 'uint256', name: 'lastAsset', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'averageLpTokens',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'averageAsset', type: 'uint256' },
      { internalType: 'uint32', name: 'timestamp', type: 'uint32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'string', name: '', type: 'string' }
    ],
    name: 'kvStore',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'lockups',
    outputs: [
      { internalType: 'uint256', name: 'amountAsset', type: 'uint256' },
      { internalType: 'uint256', name: 'amountLpToken', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'lpTokenValuation',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'assetSecondsLocked',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lpSecondsLocked',
        type: 'uint256'
      },
      { internalType: 'uint64', name: 'createTime', type: 'uint64' },
      { internalType: 'uint64', name: 'lastDepositTime', type: 'uint64' },
      { internalType: 'uint64', name: 'durationSeconds', type: 'uint64' },
      { internalType: 'bool', name: 'autoRelock', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lpTokenContract',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      {
        components: [
          { internalType: 'string', name: 'key', type: 'string' },
          { internalType: 'bytes', name: 'val', type: 'bytes' }
        ],
        internalType: 'struct ILockBox.KeyVal[]',
        name: 'entriesToUpdate',
        type: 'tuple[]'
      }
    ],
    name: 'setKvStore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalAssetLocked',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalLpTokenLocked',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lockupId', type: 'uint256' }],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

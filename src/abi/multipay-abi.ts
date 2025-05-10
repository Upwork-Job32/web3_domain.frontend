export const multiPlayAbi = [
  {
    inputs: [
      {
        internalType: 'contract ILockBox',
        name: 'lockboxContract',
        type: 'address'
      }
    ],
    name: 'createEmptyStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getStake',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IYieldVault',
        name: 'yv',
        type: 'address'
      },
      { internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' }
    ],
    name: 'lpComputeYields',
    outputs: [
      { internalType: 'uint256[]', name: 'available', type: 'uint256[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'token', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        internalType: 'struct Multipay.Payout[]',
        name: 'payouts',
        type: 'tuple[]'
      }
    ],
    name: 'multipay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IAssign',
        name: 'assignContract',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'enum IInfra.UnitType',
            name: 't',
            type: 'uint8'
          },
          {
            internalType: 'uint64',
            name: 'parentDomain',
            type: 'uint64'
          },
          { internalType: 'string', name: 'name', type: 'string' },
          {
            internalType: 'uint256',
            name: 'yieldCredits',
            type: 'uint256'
          },
          { internalType: 'address', name: 'to', type: 'address' }
        ],
        internalType: 'struct Multipay.Registration[]',
        name: 'regs',
        type: 'tuple[]'
      }
    ],
    name: 'multireg',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC721',
        name: 'nftContract',
        type: 'address'
      },
      { internalType: 'address', name: 'from', type: 'address' },
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'nftId', type: 'uint256' }
        ],
        internalType: 'struct Multipay.NftSend[]',
        name: 'sends',
        type: 'tuple[]'
      }
    ],
    name: 'nftSend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' }
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'token', type: 'address' },
      {
        internalType: 'contract ILockBox',
        name: 'lockboxContract',
        type: 'address'
      },
      { internalType: 'contract IPNS', name: 'ipns', type: 'address' },
      {
        internalType: 'uint256',
        name: 'maxStakeAmount',
        type: 'uint256'
      },
      { internalType: 'bytes', name: 'name', type: 'bytes' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'stakeDomain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

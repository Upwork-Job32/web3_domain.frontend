export const pnsAbi = [
  {
    inputs: [
      {
        internalType: 'contract ILockBox',
        name: '_lockboxContract',
        type: 'address'
      },
      { internalType: 'bool', name: '_whitelistActive', type: 'bool' },
      { internalType: 'address', name: 'pricer', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isBlacklisted',
        type: 'bool'
      }
    ],
    name: 'Blacklist',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'parentId',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'records',
        type: 'bytes'
      }
    ],
    name: 'CreateSubdomain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      }
    ],
    name: 'Destroy',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'nameHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'lockupId',
        type: 'uint64'
      }
    ],
    name: 'DestroyPrereg',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'nameHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'lockupId',
        type: 'uint64'
      }
    ],
    name: 'Preregister',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'lockupId',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'records',
        type: 'bytes'
      }
    ],
    name: 'Register',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'oldLockupId',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'newLockupId',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'records',
        type: 'bytes'
      }
    ],
    name: 'Takeover',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'id',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'records',
        type: 'bytes'
      }
    ],
    name: 'UpdateRecords',
    type: 'event'
  },
  {
    inputs: [],
    name: 'PREREG_LIFETIME_SECONDS',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'id', type: 'uint64' },
      { internalType: 'address', name: 'who', type: 'address' }
    ],
    name: 'authorizedFor',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'lockupId', type: 'uint64' },
      { internalType: 'bytes', name: 'name', type: 'bytes' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'computePreregHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'parentId', type: 'uint64' },
      { internalType: 'bytes', name: 'subdomainLabel', type: 'bytes' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'createSubdomain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'currentMinLockup',
    outputs: [{ internalType: 'uint256', name: 'price', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'id', type: 'uint64' }],
    name: 'destroy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'nameHash', type: 'bytes32' },
      { internalType: 'uint64', name: 'lockupId', type: 'uint64' }
    ],
    name: 'destroyPrereg',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'last', type: 'uint64' }],
    name: 'domainIdFreeList',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAdmin',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'id', type: 'uint64' }],
    name: 'getDomain',
    outputs: [
      { internalType: 'uint64', name: 'owner', type: 'uint64' },
      { internalType: 'uint8', name: 'subdomains', type: 'uint8' },
      { internalType: 'bool', name: 'blacklisted', type: 'bool' },
      { internalType: 'bytes', name: 'name', type: 'bytes' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes', name: 'fqdn', type: 'bytes' }],
    name: 'getDomainIdByFQDN',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'lockupId', type: 'uint64' }],
    name: 'getDomainIdByLockupId',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64[]', name: 'ids', type: 'uint64[]' }],
    name: 'getDomains',
    outputs: [
      {
        components: [
          { internalType: 'uint64', name: 'owner', type: 'uint64' },
          { internalType: 'uint8', name: 'subdomains', type: 'uint8' },
          { internalType: 'bool', name: 'blacklisted', type: 'bool' },
          { internalType: 'bytes', name: 'name', type: 'bytes' },
          { internalType: 'bytes', name: 'records', type: 'bytes' }
        ],
        internalType: 'struct IPNS.Domain[]',
        name: 'out',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'lockupId', type: 'uint256' }],
    name: 'getLockupValuation',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'nameHash', type: 'bytes32' }],
    name: 'getPrereg',
    outputs: [
      { internalType: 'uint64', name: 'timestamp', type: 'uint64' },
      { internalType: 'uint64', name: 'lockupId', type: 'uint64' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPricingInfo',
    outputs: [
      { internalType: 'address', name: 'pricer', type: 'address' },
      { internalType: 'uint64', name: 'lastRegTime', type: 'uint64' },
      { internalType: 'uint256', name: 'lastRegPrice', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'isAddressWhitelisted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'isRegistrationWhitelistActive',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lockboxContract',
    outputs: [{ internalType: 'contract ILockBox', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'nextDomainId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint64', name: 'id', type: 'uint64' }],
    name: 'ownerLockup',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'nameHash', type: 'bytes32' },
      { internalType: 'uint64', name: 'lockupId', type: 'uint64' }
    ],
    name: 'preregister',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'lockupId', type: 'uint64' },
      { internalType: 'bytes', name: 'name', type: 'bytes' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'admin', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'id', type: 'uint64' },
      { internalType: 'bool', name: 'blacklisted', type: 'bool' }
    ],
    name: 'setDomainBlacklisted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'lbox', type: 'address' }],
    name: 'setLockbox',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'pricer', type: 'address' }],
    name: 'setPricer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'id', type: 'uint64' },
      { internalType: 'uint64', name: 'newLockupId', type: 'uint64' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'takeover',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'parentId', type: 'uint64' },
          {
            internalType: 'bytes',
            name: 'subdomainLabel',
            type: 'bytes'
          },
          { internalType: 'bytes', name: 'records', type: 'bytes' }
        ],
        internalType: 'struct IPNS.NewSubdomain[]',
        name: 'newSubdomains',
        type: 'tuple[]'
      },
      {
        components: [
          { internalType: 'uint64', name: 'id', type: 'uint64' },
          { internalType: 'bytes', name: 'records', type: 'bytes' }
        ],
        internalType: 'struct IPNS.RecordUpdate[]',
        name: 'recordUpdates',
        type: 'tuple[]'
      },
      {
        internalType: 'uint64[]',
        name: 'destroyDomains',
        type: 'uint64[]'
      }
    ],
    name: 'updateMultiple',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'id', type: 'uint64' },
      { internalType: 'bytes', name: 'records', type: 'bytes' }
    ],
    name: 'updateRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'addr', type: 'address' },
          { internalType: 'bool', name: 'allowed', type: 'bool' }
        ],
        internalType: 'struct IPNS.AllowedAddress[]',
        name: 'allowed',
        type: 'tuple[]'
      },
      { internalType: 'bool', name: 'activate', type: 'bool' }
    ],
    name: 'updateRegistrationWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

# Global state spike w/ Recoil & Hooks

Each global state module owns its own state.

No one except the module itself is allowed to mutate its own state.

Other modules or components can subscribe to its state by using hooks for that purpose or request to transition the state via commands/actions returned from state transition hooks.

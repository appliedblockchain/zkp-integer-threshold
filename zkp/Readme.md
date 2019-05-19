# ZKP Integer Treshold Core

Implementation of a Integer Threshold ZKP with an hashchain based proving/verification scheme.  


#### Reference/Fork:

This library has been built using the same ZKP integer treshold hashchain concept as the one described in the VEX paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

#### Underliying principle:

An entity encodes a value V in the length of a hash chain and commits to the
value by exposing the tail of the hash chain; later, given a query Q,
the entity can prove that V ≥ Q (without disclosing V), by revealing
an appropriate node in the hash chain

Paper: https://cs.nyu.edu/~mwalfish/papers/vex-sigcomm13.pdf

 https://stratumn.com/uploads/zkp-hash-chains-2.png

https://stratumn.com/thinking/zero-knowledge-proof-of-age-using-hash-chains/

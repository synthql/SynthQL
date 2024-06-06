window.BENCHMARK_DATA = {
  "lastUpdate": 1717718113735,
  "repoUrl": "https://github.com/synthql/SynthQL",
  "entries": {
    "SynthQL query execution benchmarks": [
      {
        "commit": {
          "author": {
            "email": "ezesinachijim@gmail.com",
            "name": "Jim Ezesinachi",
            "username": "jimezesinachi"
          },
          "committer": {
            "email": "ezesinachijim@gmail.com",
            "name": "Jim Ezesinachi",
            "username": "jimezesinachi"
          },
          "distinct": true,
          "id": "bd84ff150b3a7cfb5c3d7b268574b89a7e732734",
          "message": "wip\n\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>",
          "timestamp": "2024-06-07T00:32:43+01:00",
          "tree_id": "217cc3d625700116d58512002d39e42b34d90a2c",
          "url": "https://github.com/synthql/SynthQL/commit/bd84ff150b3a7cfb5c3d7b268574b89a7e732734"
        },
        "date": 1717716908095,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 6850,
            "range": "±15.68%",
            "unit": "ops/sec",
            "extra": "52 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 1751,
            "range": "±14.31%",
            "unit": "ops/sec",
            "extra": "52 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ezesinachijim@gmail.com",
            "name": "Jim Ezesinachi",
            "username": "jimezesinachi"
          },
          "committer": {
            "email": "ezesinachijim@gmail.com",
            "name": "Jim Ezesinachi",
            "username": "jimezesinachi"
          },
          "distinct": true,
          "id": "440d5b12d3b10b8d94a97ed5ac9ab0bdd671eb32",
          "message": "removed old benchmark entries\n\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>",
          "timestamp": "2024-06-07T00:52:51+01:00",
          "tree_id": "a5495e4ea48b22846ed1ca9a90271dc52c4c3f38",
          "url": "https://github.com/synthql/SynthQL/commit/440d5b12d3b10b8d94a97ed5ac9ab0bdd671eb32"
        },
        "date": 1717718113716,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 7639,
            "range": "±25.29%",
            "unit": "ops/sec",
            "extra": "41 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 1735,
            "range": "±14.16%",
            "unit": "ops/sec",
            "extra": "49 samples"
          }
        ]
      }
    ]
  }
}
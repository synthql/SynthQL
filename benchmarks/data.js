window.BENCHMARK_DATA = {
  "lastUpdate": 1717703934594,
  "repoUrl": "https://github.com/synthql/SynthQL",
  "entries": {
    "Benchmark.js benchmark": [
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
          "id": "2e508f6cecaaa75a8d4b48edb393cfa9cdfa8351",
          "message": "wip\n\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>",
          "timestamp": "2024-06-06T20:56:49+01:00",
          "tree_id": "dbbe5206f3ba7359e3a1f8ef0cd89479186a18d2",
          "url": "https://github.com/synthql/SynthQL/commit/2e508f6cecaaa75a8d4b48edb393cfa9cdfa8351"
        },
        "date": 1717703933905,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 6421,
            "range": "±18.96%",
            "unit": "ops/sec",
            "extra": "37 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 1787,
            "range": "±9.93%",
            "unit": "ops/sec",
            "extra": "53 samples"
          }
        ]
      }
    ]
  }
}
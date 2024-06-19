window.BENCHMARK_DATA = {
  "lastUpdate": 1718782419818,
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
      },
      {
        "commit": {
          "author": {
            "email": "ezesinachijim@gmail.com",
            "name": "Jim Ezesinachi",
            "username": "jimezesinachi"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a62e6280f372a1b9bff27d649aadefe93abbe779",
          "message": "feat: added benchmark tests & workflow (#22)",
          "timestamp": "2024-06-10T19:14:59+02:00",
          "tree_id": "93b25e85aa0e6a710da8ce5bd728c25164b601b5",
          "url": "https://github.com/synthql/SynthQL/commit/a62e6280f372a1b9bff27d649aadefe93abbe779"
        },
        "date": 1718039871932,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 20135,
            "range": "±39.73%",
            "unit": "ops/sec",
            "extra": "67 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 6162,
            "range": "±1.64%",
            "unit": "ops/sec",
            "extra": "85 samples"
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7109e33466677c20505d809aafa1c97350cf1dec",
          "message": "feat: add `offset()` and `take()` to the `query` API (#23)",
          "timestamp": "2024-06-11T20:25:21+02:00",
          "tree_id": "7cccc09a0ff17539998f74abc1f8ca31d04ee356",
          "url": "https://github.com/synthql/SynthQL/commit/7109e33466677c20505d809aafa1c97350cf1dec"
        },
        "date": 1718130481809,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 19770,
            "range": "±38.36%",
            "unit": "ops/sec",
            "extra": "62 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 6028,
            "range": "±1.61%",
            "unit": "ops/sec",
            "extra": "84 samples"
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "17b6d605f3a1cf759623904735b92de246376c26",
          "message": "fix: connection error messages & fix: not handling `null` ref values (#24)\n\n* fix: iterateResultRows\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* fix: iterateResultRows\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* refactor\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* added tests\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* refactor\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* fixed tests\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n* fixed tests\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>\r\n\r\n---------\r\n\r\nSigned-off-by: Jim Ezesinachi <ezesinachijim@gmail.com>",
          "timestamp": "2024-06-12T19:50:47+01:00",
          "tree_id": "a3ae6bb7dadd86bf8d59d2ae72f7921dd485bb92",
          "url": "https://github.com/synthql/SynthQL/commit/17b6d605f3a1cf759623904735b92de246376c26"
        },
        "date": 1718218394356,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 19580,
            "range": "±40.18%",
            "unit": "ops/sec",
            "extra": "62 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 5844,
            "range": "±2.39%",
            "unit": "ops/sec",
            "extra": "83 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "fernandohur@gmail.com",
            "name": "Fernando Hurtado",
            "username": "fhur"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4e7b0a9174eb9ba791b0c2f1a76f4324b043dfd1",
          "message": "docs: updated landing page (#25)",
          "timestamp": "2024-06-19T09:31:04+02:00",
          "tree_id": "f4dcf14023c672a26044ee04385ab3164ff2cc49",
          "url": "https://github.com/synthql/SynthQL/commit/4e7b0a9174eb9ba791b0c2f1a76f4324b043dfd1"
        },
        "date": 1718782419798,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "Find one matching row",
            "value": 18940,
            "range": "±39.66%",
            "unit": "ops/sec",
            "extra": "62 samples"
          },
          {
            "name": "Find one matching row with three-level-deep nested include",
            "value": 5976,
            "range": "±3.71%",
            "unit": "ops/sec",
            "extra": "83 samples"
          }
        ]
      }
    ]
  }
}
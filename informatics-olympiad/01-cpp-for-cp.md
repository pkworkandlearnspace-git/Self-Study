# 01 · C++ for Competitive Programming
> **Goal:** turn your STL knowledge into contest speed. · **Time:** ~1 week

> [!GOAL]
> By the end of this chapter you can:
>
> - start every problem from a fast, safe **template**;
> - pick the right STL container and know the cost of each operation;
> - avoid integer **overflow** and the other classic silent bugs;
> - debug with sanitizers and `cerr`, and find wrong answers automatically with a **stress test**;
> - write solutions in the IOI "implement a function" format.
>
> Every code snippet in the Informatics chapters was compiled with `-Wall -fsanitize=address,undefined` and tested against brute force on random inputs.

## Skip test
- [ ] Write a template with fast I/O, `long long` aliases, and a multi-test-case loop.
- [ ] Sort a `vector<pair<int,int>>` by second element descending with a lambda.
- [ ] Use `lower_bound` on a sorted vector and on a `set`, and explain the complexity difference vs `std::lower_bound(set.begin(), …)`.
- [ ] Explain when `int` overflows (≈ 2.1 × 10⁹) and when to use `long long`.
- [ ] Write a **stress test**: brute force vs fast solution on random inputs, stopping at the first mismatch.

## 1 · The template

> [!CODE] A contest template
> ```cpp
> #include <bits/stdc++.h>
> using namespace std;
> using ll = long long;
>
> int main() {
>     ios::sync_with_stdio(false);   // fast I/O: don't sync with C stdio
>     cin.tie(nullptr);              // don't flush cout before every cin
>     int t = 1;                     // cin >> t;  for multi-test inputs
>     while (t--) {
>         // solve one test case
>     }
> }
> ```

> [!WARN] Fast I/O rules
> After `sync_with_stdio(false)`, don't mix `cin/cout` with `scanf/printf`. Print `"\n"`, not `endl` (which flushes the buffer every time and can be very slow with $10^6$ lines). **Exception:** in **interactive** problems you *must* flush after each query (`cout << ... << endl;` or `cout.flush()`).

## 2 · The STL toolbox

> [!DEF] Containers and their costs
> | Container | Use it for | Key operations |
> |---|---|---|
> | `vector<T>` | the default array | index $O(1)$, `push_back` amortized $O(1)$ |
> | `array<T,N>`, `pair`, `tuple` | small fixed groups | compared lexicographically |
> | `set` / `multiset` | sorted values, dynamic | insert/erase/find/`lower_bound` $O(\log n)$ |
> | `map<K,V>` | sorted key → value | $O(\log n)$ |
> | `unordered_map` | hash map | $O(1)$ average; can be attacked by anti-hash tests |
> | `priority_queue<T>` | repeatedly take the max | push/pop $O(\log n)$, top $O(1)$ |
> | `deque<T>` | push/pop at both ends | $O(1)$ |
> | `bitset<N>` | fast boolean arrays | operations ~$N/64$ |

> [!CODE] Sorting with a comparator
> ```cpp
> vector<pair<int,int>> v = {{1, 5}, {2, 3}, {3, 9}};
> sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
>     return a.second > b.second;          // by second element, descending
> });
> // min-heap instead of the default max-heap:
> priority_queue<int, vector<int>, greater<int>> pq;
> ```
> A comparator must be a **strict** ordering: use `<` or `>`, never `<=` (that can crash `sort`).

> [!KEY] `lower_bound` on a set: use the member function
> On a sorted `vector`, `lower_bound(v.begin(), v.end(), x)` is $O(\log n)$ (first element $\ge x$; `upper_bound` gives first $>x$). On a `set`, call **`s.lower_bound(x)`**, which is $O(\log n)$. The free function `std::lower_bound(s.begin(), s.end(), x)` is $O(n)$ on a set, because set iterators can't jump.

> [!DEF] Handy functions
> `iota(v.begin(), v.end(), 0)` fills $0,1,2,\dots$ · `accumulate(v.begin(), v.end(), 0LL)` sums (note the `0LL`!) · `next_permutation` iterates over permutations · `__builtin_popcount(x)` counts set bits (`__builtin_popcountll` for `long long`) · `__lg(x)` gives $\lfloor\log_2x\rfloor$ · `unique` + `erase` removes adjacent duplicates.

## 3 · Overflow and other silent bugs

> [!FORMULA] Integer limits
> `int`: up to $2^{31}-1\approx2.1\times10^9$. `long long`: up to $2^{63}-1\approx9.2\times10^{18}$. Products of two values up to $10^9$ need `long long`: write `1LL * a * b`. Sums of $2\times10^5$ values up to $10^9$ also overflow `int`.

> [!WARN] Classic silent bugs
> - `int x = a * b;` with large `a, b`: overflow before the assignment. Use `1LL * a * b`.
> - `accumulate(v.begin(), v.end(), 0)` sums in `int` because of the `0`. Use `0LL`.
> - `v.size() - 1` when `v` is empty: `size()` is unsigned, so this is a huge number. Cast: `(int)v.size() - 1`.
> - Reading past the end of an array, uninitialised variables, forgetting to reset global arrays between test cases.
> - Comparing floating-point numbers with `==`. Prefer integers; otherwise compare with a tolerance.

## 4 · Debugging and stress testing

> [!DEF] Sanitizers and debug mode
> Compile locally with
> ```bash
> g++ -std=c++17 -O2 -Wall -Wextra -fsanitize=address,undefined -D_GLIBCXX_DEBUG sol.cpp
> ```
> The sanitizers stop at the first out-of-bounds access, use-after-free or signed overflow and tell you the line; `_GLIBCXX_DEBUG` checks STL bounds. Print debug output to `cerr`, which judges ignore.

> [!KEY] Stress testing finds most wrong answers
> Write (1) a **random generator**, (2) a slow but obviously correct **brute force**, (3) your **solution**. Run them on thousands of small random inputs and stop at the first difference. The failing input is small enough to debug by hand.

> [!CODE] stress.sh
> ```bash
> #!/usr/bin/env bash
> # needs gen.cpp, brute.cpp, sol.cpp in this folder
> set -e
> for f in gen brute sol; do g++ -O2 -std=c++17 -o $f $f.cpp; done
> for i in $(seq 1 1000); do
>     ./gen $i > in.txt                 # the seed makes each test different
>     ./brute < in.txt > expected.txt
>     ./sol   < in.txt > got.txt
>     if ! cmp -s expected.txt got.txt; then
>         echo "Mismatch on test $i:"; cat in.txt
>         echo "expected:"; cat expected.txt; echo "got:"; cat got.txt
>         exit 1
>     fi
> done
> echo "All 1000 tests passed"
> ```
> And the generator, seeded from the command line:
> ```cpp
> #include <bits/stdc++.h>
> using namespace std;
> int main(int argc, char* argv[]) {
>     mt19937 rng(atoi(argv[1]));
>     int n = rng() % 8 + 1;                  // keep tests small
>     cout << n << "\n";
>     for (int i = 0; i < n; i++) cout << (int)(rng() % 21) - 10 << " \n"[i == n - 1];
> }
> ```

## 5 · The IOI task format

> [!DEF] Implementing a function
> IOI tasks usually give you a header and ask you to implement a **function**, with no `main` and no reading input yourself: the grader calls your function. For example a task might say *implement `long long solve(int N, std::vector<int> A)`*, and the grader passes the input in and checks what you return. Locally, the task package includes a sample grader to compile with. Practise this format on past IOI tasks at [oj.uz](https://oj.uz/problems).

> [!WARN] Global state between calls
> If the grader calls your function more than once, global arrays keep their old values. Reset everything at the start of the function.

> [!TRY] [Flashcards](interactive/flashcards.html)
> Choose the **Constraints** deck to connect input sizes with complexities (next chapter).

## Practice (answers hidden)

1. `int a = 100000, b = 100000; long long c = a * b;` What is stored in `c`, and how do you fix it?
<details><summary>Answer</summary>

`a * b` is computed in `int` and overflows (undefined behaviour; in practice a wrong, often negative, number) **before** conversion. Fix: `long long c = 1LL * a * b;` giving $10^{10}$.
</details>

2. You need the number of elements in a `multiset<int> s` that are $<x$. Why is `distance(s.begin(), s.lower_bound(x))` too slow for many queries, and what can you use instead?
<details><summary>Answer</summary>

`distance` walks the iterator step by step: $O(n)$. Use an order-statistics tree (`__gnu_pbds` `tree` with `order_of_key`), or a Fenwick tree over compressed values (module 03), both $O(\log n)$.
</details>

3. Your solution passes the samples but gets Wrong Answer. What is the fastest systematic way to find the bug?
<details><summary>Answer</summary>

Write a brute force and a random generator for **small** inputs and run a stress test. The first mismatching input is usually small enough to trace by hand.
</details>

4. Why can `sort(v.begin(), v.end(), [](int a, int b){ return a <= b; })` crash?
<details><summary>Answer</summary>

The comparator must be a strict weak ordering (`cmp(a,a)` must be false). With `<=`, `cmp(a,a)` is true, which can make `sort` read outside the array.
</details>

## Build
- Your personal template + a `stress.sh` script (generator, brute, solution, compare). Keep both in a repo.

## Go deeper (all optional)
- ⭐ **[USACO Guide: General & Bronze](https://usaco.guide/general)**: setup, C++ basics for CP, debugging, and stress testing.
- **[Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)** (Laaksonen), ch. 1–4.
- **[cppreference](https://en.cppreference.com/)** for exact STL semantics.

## Done when
- [ ] Template and stress script in a repo · [ ] stress test has caught at least one real bug of yours

---
title: 'Day 3: 30 Days of Interview Problems | Gonzalo Hirsch'
description: 'It is day 3 of the "30 Days of Interview Problems" challenge. I solved the "Maximum XOR After Operations" and "Find a Peak Element II" coding problems.'
headline: 'Day 3: 30 Days of Interview Problems'
excerpt: 'It is day 3 of the "30 Days of Interview Problems" challenge. I solved the "Maximum XOR After Operations" and "Find a Peak Element II" coding problems.'
date: '2022-07-27T12:00:00'
#dateUpdated: "2022-07-23T12:00:00"
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
# image:
#     src: ''
#     alt: ''
#     width: 400
#     height: 400
# tags: []
---

The "**30 Days of Interview Problems**" challenge aims to improve my coding skills in tech interviews by solving at least two programming problems each day for 30 days. **Today is day 2** of the challenge.

To avoid a bias in the problem selection, I used the "Pick One" option from [LeetCode](https://leetcode.com/) to get a random coding challenge. These are the problems I got today.

## Maximum XOR After Operations

I want to start by saying I liked [this problem](https://leetcode.com/problems/maximum-xor-after-operations/). These questions make one understand how to proceed when solving similar questions.** The key to this problem is that one can apply the operation "*any number of times*"** That means that the algorithm is not focused on using [Binary Search](https://www.geeksforgeeks.org/binary-search/) or [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming). The objective of this problem is for you to understand the hidden rule, which is the only difficulty of the problem; coding it should be straightforward.

What you need to understand is that the given update rule (`nums[i] AND (nums[i] XOR x)`) only allows the result to have `zeros` where `nums[i]` had a `zero` or either a `zero` or `one` where `nums[i]` had a one. Given the previous, and you can choose any `x` number, you could select any number to obtain a specific number within that space.

The result will always be the combination of all the ones the given numbers have. It ends up being an OR ([bitwise](https://en.wikipedia.org/wiki/Bitwise_operation)) between all the numbers.

### Solution

I realized all the previous but didn't think about it being only an OR, so I coded the following:
```java
class Solution {
    public int maximumXOR(int[] nums) {
        int result = 0;
        String bits;
        int n, number;
        // Set to remove repeated elements
        Set<Integer> mem = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            number = nums[i];
            if (!mem.contains(number)) {
                mem.add(number);
                // Get bit representation, take into consideration 
                // that it returns it from the first one onwards
                bits = Integer.toBinaryString(number);
                n = bits.length() - 1;
                // Iterate until it ends or manages to set bit
                for (int b = 0; b <= n; b++) {
                    if (hasBitAsOne(number, n - b)) {
                        result = setBit(result, n - b);
                    }
                }
            }
        }
        return result;
    }
    
    public int setBit(int x, int bit) {
        return x | (1 << bit);
    }
    
    public boolean hasBitAsOne(int x, int bit) {
        int tmp = (1 << bit);
        return (x & tmp) == tmp;
    }
}
```

This solution is the optimal one after I realized I could simplify it to an OR chain:
```java
class Solution {
    public int maximumXOR(int[] nums) {
        int result = 0;
        for (int i = 0; i < nums.length; i++) {
            result = result | nums[i];
        }
        return result;
    }
}
```

### Final Thoughts

This coding problem provides insight into how to interpret the questions an interviewer might throw at you in an interview.

## Find a Peak Element II

The peculiarity of [this problem](https://leetcode.com/problems/find-a-peak-element-ii/) is that it asks for a specific [time complexity](https://www.mygreatlearning.com/blog/why-is-time-complexity-essential/), which might not be usual. The solution should perform in `O(m log(n))` or `O(n log(m))`, which in turn offers a hint to the kind of algorithms that can perform like that.

First, I coded a [naive](https://stackoverflow.com/questions/5700575/what-is-a-naive-algorithm-and-what-is-a-closed-form-solution) and [greedy](https://en.wikipedia.org/wiki/Greedy_algorithm) approach to try if LeetCode would pass that solution. This algorithm bases itself on moving to the higher element, which ensures you will find a so-called peak. It turns out that LeetCode accepts this solution, but it does not meet the criteria of the problem.

The following is the algorithm described before:

```java
class Solution {
    public int[] findPeakGrid(int[][] mat) {
        int[] res = null;
        boolean found = false;
        int top, bottom, left, right, elem;
        int i = 0;
        int j = 0;
        int m = mat.length;
        int n = mat[0].length;
        while (!found) {
            elem = mat[i][j];
            top = i - 1 >= 0 ? mat[i - 1][j] : -1;
            if (top < elem) {
                bottom = i + 1 < m ? mat[i + 1][j] : -1;
                if (bottom < elem) {
                    left = j - 1 >= 0 ? mat[i][j - 1] : -1;
                    if (left < elem) {
                        right = j + 1 < n ? mat[i][j + 1] : -1;
                        if (right < elem) {
                            found = true;
                            res = new int[]{i,j};
                        } else j++;
                    } else j--;
                } else i++;
            } else i--;
        }
        return res;
    }
}
```

To achieve the required time complexity, Binary Search is required. [Another problem](https://leetcode.com/problems/find-peak-element/) inspires the solution to this one, so I'd recommend solving that one before. The optimal solution relies on applying Binary Search while looking for the maximum element on the given column. That maximum is compared with its neighbors, driving the Binary Search index.

### Solution

The following is the optimal solution that one can code:

```java
class Solution {
    public int[] findPeakGrid(int[][] mat) {
        int low = 0, high = mat[0].length, mid = 0, colMaxI = 0, colMax = 0, m = mat.length, n = mat[0].length;
        // Use binary search to go looking for global maximums
        while (low < high) {
            mid = (int)(low + high) / 2;
            // Look for maximum in the column
            for (int i = 0; i < mat.length; i++) {
                if (mat[i][mid] > colMax) {
                    colMax = mat[i][mid];
                    colMaxI = i;
                }
            }
            // Check with neighbours, if not within range, assume the current max is larger
            if (mid + 1 < n && mat[colMaxI][mid + 1] > colMax) {
                low = mid;
            } else if (mid - 1 >= 0 && mat[colMaxI][mid - 1] > colMax) {
                high = mid;
            } else {
                // Found peak
                return new int[]{colMaxI, mid};
            }
        }
        return new int[]{colMaxI, mid};
    }
}
```

### Final Thoughts

I would recommend solving the preceding problem before this one, but it shows how to simplify a problem by reducing dimensions.

Stay tuned for the challenge progress; you can find posts for other days [here](/blog) or see the overall progression in the [challenge post](/blog/30-days-interview-problems).
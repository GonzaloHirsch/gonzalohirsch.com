---
title: 'Day 2: 30 Days of Interview Problems | Gonzalo Hirsch'
description: 'It is day 2 of the "30 Days of Interview Problems" challenge. I solved the "Form Largest Integer With Digits That Add up to Target" and "Palindrome Pairs" coding problems.'
headline: 'Day 2: 30 Days of Interview Problems'
excerpt: 'It is day 2 of the "30 Days of Interview Problems" challenge. I solved the "Form Largest Integer With Digits That Add up to Target" and "Palindrome Pairs" coding problems.'
date: '2022-07-26T12:00:00'
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

## Form Largest Integer With Digits That Add up to Target

[This problem](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/) proved to be more complicated than I initially thought. My first instinct was to solve it using a Recursive Backtracking algorithm similar to what I encountered on [Day 1 of the challenge](http:///blog/day-1-30-days-interview-problems#letter-tile-possibilities). I quickly coded a working solution that returned a "*Time Limit Exceeded*" error.

Given the algorithm was timing out, I devised some optimizations to make it faster. I implemented the following:
- If N digits have matching costs, I can cancel all but one. The problem asks for the maximum number; if two digits have matching costs, we must keep the higher digit because it will always yield the maximum number. This optimization helps reduce the search space.
- I can cancel digits having a cost higher than the target, given those won't be used.

Even though I had some solid optimizations coded, the algorithm still timed out, so I decided to grab a hint from the problem. That hint indicated that the question could be solved using [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming).

Knowing Dynamic Programming was on the table, I started working on a solution that used [Depth First Search](https://en.wikipedia.org/wiki/Depth-first_search), an algorithm for the traversal of graph-like structures. **Dynamic Programming was the key to making the algorithm run under the time limits**, as it provides a way to cut repeated iterations by keeping track of previous states.

Using [this great explanation](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/discuss/654490/DP-is-Easy!-5-Step-DP-THINKING-process-EXPLAINED!) on how to work out the Dynamic Programming portion of the solution, I understood that those kinds of problems have three main sectors:
1. **Base cases** are where you handle the win or lose scenarios and eliminate all possible infinite recursions.
2. **Choices** are where you generate all the possible options to select.
3. **Selection** is when you have to either return a maximum or minimum value, given that these are [optimization problems](https://en.wikipedia.org/wiki/Optimization_problem).

### Solution

Understanding all the previous and using my optimizations, I managed to code the final solution, which passed all of LeetCode's tests.

```java
class Solution {
    public String largestNumber(int[] cost, int target) {
        Set<Integer> memory = new HashSet<>();
        // Optimize by killing repeated or invalid costs
        for (int i = 8; i >= 0; i--) {
            // If the cost is already present, no need to evaluate extra numbers
            // Cancel larger costs too
            if (cost[i] <= target && !memory.contains(cost[i])) {
                memory.add(cost[i]);
            } else {
                cost[i] = 0;
            }
        }
        String[][] dp = new String[10][target + 1];
        String res = this.search(1, target, cost, dp);
        return res == "" ? "0" : res;
    }
    
    private String search(int currentNumber, int remain, int[] cost, String[][] dp) {
        // Handle win/lose cases
        if (remain == 0) return "";
        else if (remain < 0 || currentNumber >= 10) return "0";
        // If the cost was killed by a larger number, use another number instead
        else if (cost[currentNumber - 1] == 0) return this.search(currentNumber + 1, remain - cost[currentNumber - 1], cost, dp);
        // Dynamic Programming memory to avoid repeated states
        if (dp[currentNumber][remain] != null) return dp[currentNumber][remain];
        // Make decision to take the number or go to the next one
        // Taking number involves choosing the number, resetting the index and decreasing the remain
        String numberToTake = currentNumber + this.search(1, remain - cost[currentNumber - 1], cost, dp); 
        // Trying next one involves increasing the number index and not the remain
        String numberToPass = this.search(currentNumber + 1, remain, cost, dp);
        // Storing the result in the DP state
        dp[currentNumber][remain] = getLargestString(numberToTake, numberToPass);
        return dp[currentNumber][remain];
    }
    
    private String getLargestString(String a, String b) {
        if (a.contains("0")) return b;
        else if (b.contains("0")) return a;
        else if (a.length() > b.length()) return a;
        else if (a.length() < b.length()) return b;
        else return a.compareTo(b) > 1 ? a : b;
    }
}
```

### Final Thoughts

This problem was useful for revisiting Dynamic Programming schemes, so it's a great choice to practice.



## Palindrome Pairs

I'm going to start by saying I didn't really like [this problem](https://leetcode.com/problems/palindrome-pairs/), and it's not because the question was classified as hard. The issue with this problem is that solutions are rather complicated to understand, and LeetCode wasn't working for me on this one.

I didn't find an optimal solution type to apply to this one, so it was more about finding some insight I doubt anyone would get in 45 minutes without seeing it beforehand.

I had to look through the discussion forums to understand why my solution wasn't fully working. I found some guidance on [this post](https://leetcode.com/problems/palindrome-pairs/discuss/79199/150-ms-45-lines-JAVA-solution), which helped make it succeed.

The principal optimization applied here is how to calculate the palindromes. I use a single for loop with two indexes starting on each end, aiming to meet in the middle.

### Solution

The final solution that passed the tests is the following:

```java
class Solution {
    public List<List<Integer>> palindromePairs(String[] words) {
        List<List<Integer>> res = new ArrayList<>();
        int n = words.length;
        // Precompute reversions
        Map<String, Integer> reversed = new HashMap<>();
        for (int i = 0; i < n; i++) { 
            reversed.put(reverse(words[i]), i);
        }
        // Iterate and find pairs
        String curr,sub1,sub2;
        int length, targetIndex;
        for (int i = 0; i < n; i++) {
            curr = words[i];
            length = curr.length();
            for (int cut = 0; cut <= length; cut++) {
                // If s1[0:cut] is palindrome and s1[cut+1] = reverse(some s2), then s2 + s1 works
                sub1 = curr.substring(0, cut);
                sub2 = curr.substring(cut);
                if (isPalindrome(sub1)) {
                    targetIndex = reversed.getOrDefault(sub2,i);
                    if (targetIndex != i) {
                        res.add(Arrays.asList(targetIndex, i));
                    }
                }
                // If s1[cut + 1:] is palindrome and s1[0:cut] = reverse(some s2), then s + s2 works
                if (sub2.length() > 0 && isPalindrome(sub2)) {
                    targetIndex = reversed.getOrDefault(sub1,i);
                    if (targetIndex != i) {
                        res.add(Arrays.asList(i, targetIndex));
                    }
                }
            }
        }
        return res;
    }
    
    private String reverse(String word) {
        return new StringBuilder(word).reverse().toString();
    }
    
    private boolean isPalindrome(String word) {
        int n = word.length();
        for (int i = 0; i < n / 2; i++) {
            if (word.charAt(i) != word.charAt(n - 1 - i)) return false;
        }
        return true;
    }
}
```

### Final Thoughts

It's not a problem worth solving because it took a lot of time to work out the tiny errors that LeetCode threw at me. I would only solve it or look at the solutions to understand the insight.

Stay tuned for the challenge progress; you can find posts for other days [here](/blog) or see the overall progression in the [challenge post](/blog/30-days-interview-problems).
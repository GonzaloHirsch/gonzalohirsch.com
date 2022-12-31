---
title: 'Day 1: 30 Days of Interview Problems | Gonzalo Hirsch'
description: 'It is day 1 of the "30 Days of Interview Problems" challenge. I solved the "Encrypt and Decrypt Strings" and "Letter Tile Possibilities" coding problems.'
headline: 'Day 1: 30 Days of Interview Problems'
excerpt: 'It is day 1 of the "30 Days of Interview Problems" challenge. I solved the "Encrypt and Decrypt Strings" and "Letter Tile Possibilities" coding problems.'
date: '2022-07-25T12:00:00'
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

The "**30 Days of Interview Problems**" challenge aims to improve my coding skills in tech interviews by solving at least two programming problems each day for 30 days. **Today is day 1** of the challenge.

To avoid a bias in the problem selection, I used the "Pick One" option from [LeetCode](https://leetcode.com/) to get a random coding challenge. These are the problems I got today.

## Encrypt and Decrypt Strings

This [problem](https://leetcode.com/problems/encrypt-and-decrypt-strings/) proved to be an interesting one in terms of a solution. I, initially, didn't give much thought to the performance; my mindset was to achieve a working solution and use that. The only aspect I was sure about was using a HashMap for the encryption and decryption. The main advantage of the [Hash Table](https://en.wikipedia.org/wiki/Hash_table) data structure is the fast access it provides, [O(1)](https://www.freecodecamp.org/news/my-first-foray-into-technology-c5b6e83fe8f1/).

After about 30 minutes, I managed to get a working solution, which worked well for the initial cases.

The problems started when I got to submit it, thinking it would just be fine. The main issue with that algorithm is that if you get more than one option to decrypt, time complexity increases rapidly. That caused extensive inputs to fail with a "Time Limit Exceeded" error.

At that point, my idea was to add a cache so that I would cache the result of the `encrypt` and `decrypt` methods to be used later on. I attempted to do that using a `HashMap` and applied that before operating. This fix was futile because it didn't solve the error.

Inspired by both the error and the solution, I got an idea. I have all the valid words, and I only need to return the number of strings. I can precompute all the encryptions for the different accepted inputs and store the results to use later. Using that solution, I cut the code by more than half, reducing the complexity.

### Solution

The resulting algorithm is as follows:

```java
class Encrypter {
    private Map<Character, String> keyToValue = new HashMap<>();
    private Map<String, Integer> validWords = new HashMap<>();
    
    public Encrypter(char[] keys, String[] values, String[] dictionary) {
        // Add key -> value mapping to the keys map
        for (int i = 0; i < keys.length; i++) {
            this.keyToValue.put(keys[i], values[i]);
        }
        String encryption;
        for (String word : dictionary) {
            // Encrypt the word
            encryption = this.encrypt(word);
            // verify if the possible encryption exists
            if (!this.validWords.containsKey(encryption)) {
                this.validWords.put(encryption, 0);
            }
            // Accumulate the number of words that can be encrypted to that string
            this.validWords.put(encryption, this.validWords.get(encryption) + 1);
        }
    }
    
    public String encrypt(String word1) {
        // Convert to char array for iteration
        char[] tmp = word1.toCharArray();
        // Use a StringBuilder for performance
        StringBuilder sb = new StringBuilder();
        for (Character c : tmp) {
            // Need to check if key is present for edge cases
            if (!this.keyToValue.containsKey(c)) return "";
            sb.append(this.keyToValue.get(c));
        }
        return sb.toString();
    }
    
    // No need to decrypt, we know all the posibilities so there's no need to calculate the decryption
    public int decrypt(String word2) {
        return this.validWords.getOrDefault(word2, 0);
    }
}

/**
 * Your Encrypter object will be instantiated and called as such:
 * Encrypter obj = new Encrypter(keys, values, dictionary);
 * String param_1 = obj.encrypt(word1);
 * int param_2 = obj.decrypt(word2);
 */
```

It's clear this solution has cleaner code and is easier to understand, so I'm content with it.

### Final Thoughts

All in all, it was a compelling problem to start the challenge. It should've taken around 15 minutes from start to end, but it took me more than that, given I went for alternative solutions.

The one criticism of the problem I would add is that the description wasn't clear at different points. For example, it specifies what to do if the input for the `encrypt` function is invalid; but does not for the parameters of the `decrypt` function.

## Letter Tile Possibilities

The "[Letter Tile Possibilities](https://leetcode.com/problems/letter-tile-possibilities/)" problem was more straightforward than the previous one and required less code and time to think.

From the start, it was clear that using some form of [Recursive Backtracking](https://www.geeksforgeeks.org/backtracking-introduction/) was the way to go. Combining that recursion with some [pruning](https://stevenschmatz.gitbooks.io/data-structures-and-algorithms/content/281/lecture_19.html) conditions would achieve the performance levels required. That was the algorithm I started coding.

It didn't take long to achieve that solution; it took me around 15 minutes to complete the entire problem, from starting to read it until submission.

### Solution

I opted for a solution that uses class variables to reduce the size of the method call frame, thus reducing the memory required. I would send those variables as parameters if using a class wasn't an option.

```java
class Solution {
    private char[] tiles;
    private boolean[] usage;
    private Set<String> seqs;
    
    public int numTilePossibilities(String tiles) {
        this.seqs = new HashSet<>();
        this.tiles = tiles.toCharArray();
        this.usage = new boolean[this.tiles.length];
        // Call it with empty initial and target of length 1
        this.possibilitiesRec("", 1);
        return this.seqs.size();
    }
    
    private void possibilitiesRec(String curr, int targetLength) {
        String target;
        for (int i = 0; i < this.tiles.length; i++) {
            // Check if the tile was used or not
            if (!this.usage[i]) {
                target = curr + this.tiles[i];
                // Check if sequence is present, if not, add it and count it
                // Do nothing otherwise
                if (!this.seqs.contains(target)) {
                    this.seqs.add(target);
                }
                // Mark tile as used
                this.usage[i] = true;
                // Expand search to elements of one more length
                this.possibilitiesRec(target, targetLength + 1);
                // Mark tile as not used
                this.usage[i] = false;
            }
        }
    }
}
```

### Final Thoughts

This problem was easy and would be a great way to start practicing more complex algorithms.

Stay tuned for the challenge progress; you can find posts for other days [here](/blog) or see the overall progression in the [challenge post](/blog/30-days-interview-problems).
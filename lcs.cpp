#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int i = 0;
        int j = 0;
        int oj = j;
        int lcs = 0;

        while(i != text1.size()){
            if(oj == text2.size()){
                i++; oj = j;
                continue;
            }
            if(text1[i] == text2[oj]){
                lcs++; i++; j++; oj = j;
            }
            else
                oj++;
        }
        return lcs;
    }
};

int main() {
    Solution sol;
    
    // Working case
    string test1_1 = "abcde";
    string test1_2 = "ace";
    cout << "Test 1 (should be 3): " << sol.longestCommonSubsequence(test1_1, test1_2) << endl;
    
    // Failing case
    string test2_1 = "abcde";
    string test2_2 = "cba";
    cout << "Test 2 (should be 1, gets 2): " << sol.longestCommonSubsequence(test2_1, test2_2) << endl;
    
    return 0;
}
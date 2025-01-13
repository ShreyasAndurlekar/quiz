#include <iostream>
#include <queue>
#include <vector>
#include <unordered_map>
#include <climits>

using namespace std;

void primMST(int n, vector<pair<int, int>> edges[]){

   priority_queue<pair<int ,int>, vector<pair<int, int>>, greater<pair<int , int>>> minHeap;
   unordered_map<int, bool> visited;
   int mstcost = 0;
   minHeap.push({0,0});

   while(!minHeap.empty()){
      
     int node = minHeap.top().second;
     int cost = minHeap.top().first;
     minHeap.pop();

     if(visited.count(node) > 0)
        continue;

     mstcost += cost;
     visited[node] = true;

     vector<pair<int, int>> neighbors = edges[node];

     for(pair edges : neighbors)
        minHeap.push({edges.second, edges.first});
      
   }

   cout << mstcost;
}

int main(){

    int n = 5; // Number of nodes
    vector<pair<int, int>> adj[n];

    // Add edges (undirected graph)
    adj[0].push_back({1, 2});
    adj[1].push_back({0, 2});
    adj[0].push_back({3, 6});
    adj[3].push_back({0, 6});
    adj[1].push_back({3, 8});
    adj[3].push_back({1, 8});
    adj[1].push_back({2, 3});
    adj[2].push_back({1, 3});
    adj[1].push_back({4, 5});
    adj[4].push_back({1, 5});
    adj[2].push_back({4, 7});
    adj[4].push_back({2, 7});

    primMST(n, adj);

    return 0;
    
}

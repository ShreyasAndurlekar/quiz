#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
#include <climits>

using namespace std;

int main(){

  unordered_map<char, vector<pair<char, int>>> graph = 
  {
    {'A',{{'B',7},{'C',3}}}, 
    {'B',{{'A',7},{'D',4},{'C',2}}}, 
    {'C',{{'A',3},{'B',2},{'D',5},{'E',6}}},
    {'D',{{'B',4},{'F',8},{'C',5},{'E',5}}},
    {'E',{{'C',6},{'F',3}}},
    {'F',{{'D',8},{'E',3}}}
  };

  priority_queue< pair<int, char>, vector<pair<int, char>>, greater<pair<int, char>> > minHeap;

  unordered_map<char, bool> visited;
  unordered_map<char, char> parents;
  unordered_map<char, int> dist;

  for(pair p : graph)
     dist[p.first] = INT_MAX;
  
  minHeap.push({0,'A'});
  dist['A'] = 0;

  // p.first = node
  // p.second = neighbors = {Node : Distance}

  while(!minHeap.empty()){
    
    char node = minHeap.top().second;
    minHeap.pop();

    if(visited.count(node) > 0)
      continue;

    printf("\nProcessing Node %c now\n",node);

    vector<pair<char, int>> neighbors = graph[node];

    printf("it's neighbors: \n");

    for(pair p : neighbors)
      printf("%c - %i    ",p.first,p.second);

    printf("\n");

    visited[node] = true;

    for(pair p : neighbors){

       if(dist[node] + p.second < dist[p.first]){
          
        printf("Accum Dist %i is less than Node %c's distance %i from A\n",dist[node] + p.second,p.first,dist[p.first]);
       
        dist[p.first] = dist[node] + p.second;
        minHeap.push({dist[p.first],p.first});

        printf("%c - %i has been pushed to minHeap\n",p.first,dist[p.first]);
        
       }
       else 
         printf("Accum Dist %i is not less than Node %c's distance %i from A\n",dist[node] + p.second,p.first,dist[p.first]);

    }
  }

  printf("\n");

  for(pair p : dist)
    printf("%c - %i\n",p.first, p.second);

  return 0;
}


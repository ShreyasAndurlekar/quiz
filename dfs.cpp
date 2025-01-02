#include <iostream>
#include <vector>
#include <set>

using namespace std;

set<pair<int, int>> s;

int dfs(vector<vector<int>> graph, int r, int c){

  if(r == graph.size() - 1 && c == graph[0].size() - 1){

    cout << "Found\n" << endl;
    return 1;
  }

  if(r < 0 || c < 0 || r == graph.size() || c == graph[0].size() || s.count({r,c}) > 0 || graph[r][c] == 1)
    return 0;
  
  for(int i = 0; i < graph.size(); i++){

    for(int j = 0; j < graph[0].size(); j++){

      if(i == r && j == c)
        cout << "*" << " ";
      else if(s.count({i,j}) > 0)
        cout << "+" << " ";
      else
        cout << graph[i][j] << " ";

    }

    cout << endl;
  }

  cout << "\n";

  s.insert({r,c});

  int count = 0;

  count += dfs(graph,r-1,c);
  count += dfs(graph,r+1,c);
  count += dfs(graph,r,c-1);
  count += dfs(graph,r,c+1);

  s.erase({r,c});
  
  return count;

}

int main(){
  
  vector<vector<int>> graph = {{0,0,1,0},{0,0,0,0},{0,1,0,0},{0,0,1,0}};

  cout << dfs(graph,0,0) << endl; 
  
}

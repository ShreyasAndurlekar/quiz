#include <iostream>
#include <vector>
#include <set>
#include <queue>

using namespace std;

vector<vector<int>> v = {
    {0, 0, 0, 1, 0},
    {1, 1, 0, 1, 0},
    {0, 0, 0, 0, 0},
    {0, 1, 1, 1, 0},
    {0, 0, 0, 1, 0}
};
set<pair<int, int>> s;

void printy(int r, int c){

  for(int i = 0; i < v.size(); i++){

    for(int j = 0; j < v[0].size(); j++){

      if(i == r && j == c)
        cout << "*" << " ";
      else if(s.count({i,j}) > 0)
        cout << "+" << " ";
      else
        cout << v[i][j] << " ";

    }

    cout << endl;
  }

  cout << "\n";   
}

int bfs(){

  queue<pair<int, int>> q;
  q.push({0,0});
  s.insert({0,0});

  int level = 0;
  
  vector<pair<int, int>> d = {{-1,0}, {1,0}, {0,1}, {0,-1}};

  while(!q.empty()){

     level++;

     for(int i = 0; i < q.size(); i++){
  
       auto [tr,tc] = q.front();
       q.pop();

       for(pair p : d){
       
          int r = p.first + tr;
          int c = p.second + tc;

          if(r == -1 || c == -1 || r == v.size() || c == v[0].size() || s.count({r,c}) > 0 || v[r][c] == 1)
            continue;

          printy(r,c);

          if(r == v.size() - 1 && c == v[0].size() - 1)
            return level+1;

          s.insert({r,c});
          q.push({r,c});

       }
    }
    
  }

  return 0;

}

int main(){

   cout << bfs() << endl;
}

/*

The for while inside the q.empty() is important because it helps us increment level only after all the nodes are processed
The q.empty() is only needed in case we don't find required target
Stack is related to recursion hence we don't use recursion here.


*/


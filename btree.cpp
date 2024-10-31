#include <iostream>
#include <stdlib.h>

using namespace std;

class Node{

  public:
    
    int value;
    Node* left;
    Node* right;

    Node(int n, Node* left, Node* right){

      this->value = n;
      this->left = left;
      this->right = right;
    }
    
    void insert(Node*& root, int n){
      
      if(root == NULL){

         Node* nn = new Node(n, NULL, NULL);
         root = nn;
         return;
      }

      if(n < root->value)
        insert(root->left,n);
      else   
        insert(root->right, n);
      
       
    }

    void preorder(Node* root){
      
      if(root == NULL)
          return;

      preorder(root->left);
      cout << root->value << ",";
      preorder(root->right);
       
    }

    Node* search(Node* thenode, int n){     // return parent of child to be deleted

      if(thenode != NULL){

          if(thenode -> value == n)
              return thenode;

          if(n < thenode -> value){

            Node *ans = search(thenode->left,n);
            
            if(ans != NULL && ans->value == n)       // when returning NULL when not found we can't extract val of a NULL pointer
              return thenode;                       // manipulating choice based on whether to pass back currentnode or ans. Pass currentnode if found ans or else pass ans :0

            return ans;
          }
          else{
            
             Node* ans = search(thenode->right,n);
             
             if(ans != NULL && ans -> value == n)
                return thenode;

             return ans;

          } 
                     
      }

      return NULL;
          
    }

    void del(Node*& thenode, int n){

       Node* res = search(thenode, n);

       if(res != NULL)
          printf("\n%i found",res->value);
       else
         printf("Not found");
      
        // save reference of node to be deleted's children

        Node* tobedel = NULL;

        if(res->left != NULL && res->left->value == n)
          tobedel = res->left;
        if(res->right != NULL && res->right->value == n) {
          tobedel = res->right;
        }

        // parent node can have two children tobedel cannot have two children
        
        

        if(tobedel-> left == NULL && tobedel->right == NULL){
             
          free(tobedel);
          res->left = NULL;
          tobedel = NULL;     // very important otherwise tobedel would be a dangling pointer trying to access something that's deleted.
          return;

        }
        
        if(tobedel->left != NULL)
          res->left = tobedel->left;
        else 
          res->right = tobedel->right;
        
      
        // del tobedel
         
    
       // RES IS PARENT NODE OF CHILD TO deleted
       
    }

    // so turns out my code is actually garbage and I should not rely on the parent node to delete stuff and just use recursion..
    
    Node* findmin(Node* root){

       if(root->left)
        return findmin(root->left);

       return root;
    }

  // I guess I should avoid using void functions to utilize return that way it gives me more power while using recursion

    Node* del2(Node*& root, int n){

       if(root->value == n){

         if(root->left && root->right){

           Node* minnode = findmin(root->right);
           int valtoreplace = minnode->value;
           del2(root, minnode->value);
           root->value = valtoreplace;
           return root;

         }
         else if(root->left)
           return root->left;
         else if(root->right)
           return root->right;

        return NULL;
         
       }

       if(n < root->value)
         root->left = del2(root->left,n);
       else 
         root->right = del2(root->right,n);
       
      return root;
    }
};



int main(){

  int a[] = {40,72,55,32,89,29, 15, 18, 43, 99};
      
  Node* root = NULL;

  for(int n : a){
    
     root->insert(root,n);
      
  }

  root->preorder(root);
  root->del2(root,72);
  printf("\n");
  root->preorder(root);
 
  return 0;
   
}

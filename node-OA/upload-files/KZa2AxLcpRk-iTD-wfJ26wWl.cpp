#include<stdio.h>
#include<stdlib.h>
#include<string.h>
char A[20];/*分析栈*/
char B[20];/*剩余串*/
char vt[20]={'i','+','*','(',')','#','-','/'};/*终结符  */
struct s{
char c[5];
}table[106][106]={'\0'};
int j=0,b=0,top=0,length;/*L为输入串长度 */

void printfA()/*输出分析栈  */
{
	int a;/*指针*/
	for(a=0;a<=top+1;a++)
		printf("%c",A[a]);
	printf("\t\t");
}

void printfB()/*输出剩余串*/
{
	int j;
	for(j=0;j<b;j++)/*输出对齐符*/
		printf(" ");
	for(j=b;j<=length;j++)
		printf("%c",B[j]);
	printf("\t\t\t");
}
void table1()
{
strcpy(table['E']['('].c,"TG");
strcpy(table['E']['i'].c,"TG"); 
strcpy(table['G']['-'].c,"-TG");
strcpy(table['G']['+'].c,"+TG");
strcpy(table['G'][')'].c,"!");
strcpy(table['G']['#'].c,"!");
strcpy(table['T']['('].c,"FS");
strcpy(table['T']['i'].c,"FS");
strcpy(table['F']['('].c,"(E)");
strcpy(table['F']['i'].c,"i");
strcpy(table['S'][')'].c,"!");
strcpy(table['S']['+'].c,"!");
strcpy(table['S']['*'].c,"*FS");
strcpy(table['S']['/'].c,"/FS");
strcpy(table['S']['#'].c,"!");
}

int main()
{    table1();
	int k=0,flag=0,finish=0;
	char ch,x;
	
   printf("请输入要分析的字符串:");
   do/*读入分析串*/
   {
	   scanf("%c",&ch);
	   if ((ch!='i') &&(ch!='+') &&(ch!='*')&&(ch!='(')&&(ch!=')')&&(ch!='#'))
	   {
		   printf("输入串中有非法字符\n");
		   exit(1);
	   }
	   B[j]=ch;
	   j++;
   }while(ch!='#');
   length=j;/*分析串长度*/
   ch=B[0];/*当前分析字符*/
   A[top]='#'; 
   top=top+1;A[top]='E';/*'#','E'进栈*/
   printf("步骤\t\t分析栈 \t\t剩余字符 \t\t所用产生式 \n");
   do
   {
	  x=A[top--];/*x为当前栈顶字符*/
      printf("%d",k++);
      printf("\t\t");
      for(j=0;j<=5;j++)/*判断是否为终结符*/
		  if(x==vt[j]) 
		  {
			  flag=1;
			  break;
		  }
		  if(flag==1)/*如果是终结符*/
		  {
			  if(x=='#')
			  {
				  finish=1;/*结束标记*/
				  printf("accept!\n");/*接受 */
				  getchar();
				  getchar();
				  exit(1);
			  }/*if*/
			  if(x==ch)
			  {
				  printfA();
				  printfB();
				  printf("%c匹配\n",ch);
				  ch=B[++b];/*下一个输入字符*/
				  flag=0;/*恢复标记*/
			  }/*if*/
			  else/*出错处理*/
			  {
				  printfA();
				  printfB();
				  printf("%c出错\n",ch);/*输出出错终结符*/
				  exit(1);
			  }
		  }
		  else/*非终结符处理*/
		  {
			 if(strlen(table[x][ch].c)!=0){
			int k=strlen(table[x][ch].c);
				printfA();
				printfB();
				printf("%c->",x);/*输出产生式*/
				for(j=0;j<k;j++)
                printf("%c",table[x][ch].c[j]);
				printf("\n");
				//top=top-1;;
				for(j=k-1;j>=0;j--)/*产生式逆序入栈*/
				{	A[++top]=table[x][ch].c[j];
				}
				if(A[top]=='!')/*为空则不进栈*/
				top--;
			
			}
			else/*出错处理*/
			{
				printfA();
				printfB();
				printf("%c出错\n",x);/*输出出错非终结符*/
				exit(1);
			}
		}
   }while(finish==0);
}
 



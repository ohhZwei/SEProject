#include<stdio.h>
#include<stdlib.h>
#include<string.h>
char A[20];/*����ջ*/
char B[20];/*ʣ�മ*/
char vt[20]={'i','+','*','(',')','#','-','/'};/*�ս��  */
struct s{
char c[5];
}table[106][106]={'\0'};
int j=0,b=0,top=0,length;/*LΪ���봮���� */

void printfA()/*�������ջ  */
{
	int a;/*ָ��*/
	for(a=0;a<=top+1;a++)
		printf("%c",A[a]);
	printf("\t\t");
}

void printfB()/*���ʣ�മ*/
{
	int j;
	for(j=0;j<b;j++)/*��������*/
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
	
   printf("������Ҫ�������ַ���:");
   do/*���������*/
   {
	   scanf("%c",&ch);
	   if ((ch!='i') &&(ch!='+') &&(ch!='*')&&(ch!='(')&&(ch!=')')&&(ch!='#'))
	   {
		   printf("���봮���зǷ��ַ�\n");
		   exit(1);
	   }
	   B[j]=ch;
	   j++;
   }while(ch!='#');
   length=j;/*����������*/
   ch=B[0];/*��ǰ�����ַ�*/
   A[top]='#'; 
   top=top+1;A[top]='E';/*'#','E'��ջ*/
   printf("����\t\t����ջ \t\tʣ���ַ� \t\t���ò���ʽ \n");
   do
   {
	  x=A[top--];/*xΪ��ǰջ���ַ�*/
      printf("%d",k++);
      printf("\t\t");
      for(j=0;j<=5;j++)/*�ж��Ƿ�Ϊ�ս��*/
		  if(x==vt[j]) 
		  {
			  flag=1;
			  break;
		  }
		  if(flag==1)/*������ս��*/
		  {
			  if(x=='#')
			  {
				  finish=1;/*�������*/
				  printf("accept!\n");/*���� */
				  getchar();
				  getchar();
				  exit(1);
			  }/*if*/
			  if(x==ch)
			  {
				  printfA();
				  printfB();
				  printf("%cƥ��\n",ch);
				  ch=B[++b];/*��һ�������ַ�*/
				  flag=0;/*�ָ����*/
			  }/*if*/
			  else/*������*/
			  {
				  printfA();
				  printfB();
				  printf("%c����\n",ch);/*��������ս��*/
				  exit(1);
			  }
		  }
		  else/*���ս������*/
		  {
			 if(strlen(table[x][ch].c)!=0){
			int k=strlen(table[x][ch].c);
				printfA();
				printfB();
				printf("%c->",x);/*�������ʽ*/
				for(j=0;j<k;j++)
                printf("%c",table[x][ch].c[j]);
				printf("\n");
				//top=top-1;;
				for(j=k-1;j>=0;j--)/*����ʽ������ջ*/
				{	A[++top]=table[x][ch].c[j];
				}
				if(A[top]=='!')/*Ϊ���򲻽�ջ*/
				top--;
			
			}
			else/*������*/
			{
				printfA();
				printfB();
				printf("%c����\n",x);/*���������ս��*/
				exit(1);
			}
		}
   }while(finish==0);
}
 



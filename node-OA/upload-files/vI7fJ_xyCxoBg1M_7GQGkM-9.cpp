#include<stdio.h>

int find(int a,int b)   //���ȹ�ϵ��
{
    int table[6][6] = {
                       1, -1, -1, -1, 1, 1,
                       1,  1, -1, -1, 1, 1,
                       1,  1,  2,  2, 1, 1,
                      -1,- 1, -1, -1, 0, 2,
                       1,  1,  2,  2, 1, 1,
                      -1, -1,- 1, -1, 2, 0
                      };

  return table[a-1][b-1];

}


int in_vt(char c)    //���Ը��ݷ��ص���ֵȥ���ȹ�ϵ������������ȹ�ϵ
{                    //�������ж��Ƿ��Ƿ��ս�������Ƿ��ս������0
   int n;

   switch(c)
   {
       case '+': n = 1; break;
       case '*': n = 2; break;
       case 'i': n = 3; break;
       case '(': n = 4; break;
       case ')': n = 5; break;
       case '#': n = 6; break;
       default : n = 0;
   }

   return n;

}




int judge(char *p,int k,char *psc)
{

        if(k == 1 && p[k] == '#' && (*psc == '+' || *psc == '*'))
        {
                printf("\n�����ǰ��û�в�������\n");
                return 0;
        }
        if((*psc == '+' || *psc == '*') && (*(psc + 1) == '+' || *(psc + 1) == '*'))
        {
                printf("\n����������ڣ�\n");
                return 0;
        }
        if(*psc == '#' && (*(psc - 1) == '+' || *(psc - 1) == '*'))
        {
                printf("\n���������û�в�������\n");
                return 0;
        }
        return 1;
}



int main()
{
   int  k;                   //ջ��ָ��
   char s[30] = {'\0'};      //����ջ
   char *ss;
   char in_c[50] = {'\0'};   //���봮
   char *psc;                //ָ��ǰ�������
   int  j;
   char q;
   int  flag;
   int  n;

while(1)
{

   printf("\n************************************\n");
   printf("������Ҫ��Լ���ַ���(�ԡ�#������)��");
   scanf("%s",in_c);

   n = 1;          //��¼����
   k = 1;		  // ջ�ĵ�ǰλ�� 
   s[k] = '#';
   s[k+1] = '\0';    //��ʼ��
   ss = s + 1;       //ָ��ջ��
   psc = in_c;		// ���봮λ�� 


   printf("\n����\tջ���ַ�\t\t���ȹ�ϵ\t��ǰ����\tʣ�����봮\t\t\t�ƽ����Լ\n");
   while(1)
   {
          if(judge(s,k,psc) == 0)
          {
                  printf("\n����\n");
                  break;
          }
		  //  �Ƿ�Ϊ���ս�� 
		  // j��¼�ŵ�ǰջ����ջ��������ս����λ�� 
          if(in_vt(s[k]))
              j = k;
          else
              j = k - 1;
		  
		  // ��ǰ������ջ����ķ��Ž��бȽ� 
          flag = find(in_vt(s[j]),in_vt(*psc));
          if(flag == 1)  //���s[j] > ��ǰ�����ַ�
          {
               do
               {
                   q = s[j];
                   if(in_vt(s[j-1]))
                        j--;
                   else
                        j = j - 2;
               }while(find(in_vt(s[j]),in_vt(q)) != -1);

               printf("(%d)\t%-24s>\t\t%c\t\t%-32s��Լ\n",n++,ss,*psc,psc+1);
               k = j + 1;
               s[k] = 'N';
               s[k+1] = '\0';
               continue;
          }
          else if(flag == -1)
               {
                   printf("(%d)\t%-24s<\t\t%c\t\t",n++,ss,*psc);
                   k++;
                   s[k] = *psc;
                   s[k+1] = '\0';
                   psc++;
                   printf("%-32s�ƽ�\n",psc);
                   continue;
               }
               else if(flag == 0)
                    {
                          if(s[j] == '#')
                          {
                               printf("(%d)\t%-24s=\t\t#\t\t\t\t\t\t����\n",n,ss);
                               printf("\n��Լ�ɹ���\n");
                               break;
                          }
                          else
                          {
                               printf("(%d)\t%-24s=\t\t%c\t\t",n++,ss,*psc);
                               k++;
                               s[k] = *psc;
                               s[k+1] = '\0';
                               psc++;
                               printf("%-32s�ƽ�\n",psc);
                               continue;
                          }
                     }
                     else
                     {
                          printf("(%d)\t%-24s��\t\t%c\t\t%-32s\\\n",n++,ss,*psc,psc+1);
                          printf("\n����\n");
                          break;
                     }



   }

}


 return 0;
}



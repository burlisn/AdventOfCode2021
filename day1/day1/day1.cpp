// day1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <string>

int main()
{
    std::fstream file1("input.txt", std::fstream::in);
    std::cout << "Hello World!\n";
    std::cout << "I just added this line\n";

    std::string input1;
    std::string input2;
    std::string input3;
    int increaseCount = 0;
    int increaseSum = 0;
    int prevSum = 0;
    int curSum = 0;

    //First read
    file1>>input1>>input2>>input3;

    do{
        if(stoi(input2)>stoi(input1)){
            ++increaseCount;
        }
        curSum = stoi(input1)+stoi(input2)+stoi(input3);
        if(curSum>prevSum && prevSum != 0){
            ++increaseSum;
        }

        input1 = input2;
        input2 = input3;
        prevSum = curSum;
    }while(file1>>input3);

    if(stoi(input2)>stoi(input1)){
        ++increaseCount;
    }

    std::cout << increaseCount << std::endl;
    std::cout << increaseSum << std::endl;
    return 0;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file

// day2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <fstream>
#include <iostream>
#include <string>

#define fwd "forward"
#define down "down"
#define up "up"

int main()
{
    int32_t horizontal = 0;
    int64_t vertical = 0;
    int32_t aim = 0;
    std::string direction = "";
    std::string size = "";

    std::fstream file1("input.txt");

    while(file1 >> direction >> size){
        if(direction == fwd){
            horizontal += stoi(size);
            vertical += aim*stoi(size);
        } else if(direction == down){
            aim += stoi(size);
        } else if(direction == up){
            aim -= stoi(size);
        }
    }

    std::cout << horizontal * vertical;
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

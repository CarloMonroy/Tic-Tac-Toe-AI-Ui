board = {
    1:" ", 2:" ", 3:" ",
    4:" ", 5:" ", 6:" ",
    7:" ", 8:" ", 9:" "
}

def  print_board(board):
    print(f"{board[1]}|{board[2]}|{board[3]}\n-----\n"
          f"{board[4]}|{board[5]}|{board[6]}\n-----\n"
          f"{board[7]}|{board[8]}|{board[9]}"
          f"\n\n"
          )


def space_is_free(position):
    if board[position] == " ":
        return True
    else:
        return False


def check_draw():
    for key in board.keys():
        if board[key] == " ":
            return False

    return True



def check_win():
    if board[1] == board[2] and board[1] == board[3] and board[1] != ' ':
        return True
    elif board[4] == board[5] and board[4] == board[6] and board[4] != ' ':
        return True
    elif board[7] == board[8] and board[7] == board[9] and board[7] != ' ':
        return True
    elif board[1] == board[4] and board[1] == board[7] and board[1] != ' ':
        return True
    elif board[2] == board[5] and board[2] == board[8] and board[2] != ' ':
        return True
    elif board[3] == board[6] and board[3] == board[9] and board[3] != ' ':
        return True
    elif board[1] == board[5] and board[1] == board[9] and board[1] != ' ':
        return True
    elif board[7] == board[5] and board[7] == board[3] and board[7] != ' ':
        return True
    else:
        return False


def check_win_mark(mark):
    if board[1] == board[2] and board[1] == board[3] and board[1] == mark:
        return True
    elif board[4] == board[5] and board[4] == board[6] and board[4] == mark:
        return True
    elif board[7] == board[8] and board[7] == board[9] and board[7] == mark:
        return True
    elif board[1] == board[4] and board[1] == board[7] and board[1] == mark:
        return True
    elif board[2] == board[5] and board[2] == board[8] and board[2] == mark:
        return True
    elif board[3] == board[6] and board[3] == board[9] and board[3] == mark:
        return True
    elif board[1] == board[5] and board[1] == board[9] and board[1] == mark:
        return True
    elif board[7] == board[5] and board[7] == board[3] and board[7] == mark:
        return True
    else:
        return False


def insert_letter(letter, position):
    if space_is_free(position):
        board[position] = letter
        print_board(board)
        if check_draw():
            print("Draw")
            exit() # We use exit to end the program if there is a draw
                    # Usamos exit para terminar el programa si hay un empate
        if check_win():
            if letter == "X":
                print("BOT Wins")
                exit()
            else:
                print("User Wins")
                exit()
        return

    else:
        print("that space is not available")
        position = int(input("Insert new position"))
        insert_letter(letter, position)
        return

user = "O"
bot = "X"
def user_move():
    position = int(input("Enter the position for 'O': "))
    insert_letter(user, position)
    return

def bot_move():
    best_score = -800
    best_move = 0

    for key in board.keys():
        if board[key] == " ":
            board[key] = bot
            score = minimax(board, 0, False)
            board[key] = " "
            if score > best_score:
                best_score = score
                best_move = key
    insert_letter(bot, best_move) # Aqui insertamos el movimiento final del bot
                                # Here we inster the best move
    return




def minimax(board, depth, is_maximizing):
    if check_win_mark(bot):
        return 1
    elif check_win_mark(user):
        return -1
    elif check_draw():
        return 0

    if is_maximizing:
        best_score = -800
        for key in board.keys():
            if board[key] == ' ':
                board[key] = bot
                score = minimax(board,0,False)
                board[key] = ' '
                if score > best_score:
                    best_score = score
        return best_score
    else:
        best_score = 800
        for key in board.keys():
            if board[key] == ' ':
                board[key] = user
                score = minimax(board,0, True)
                board[key] = " "
                if score < best_score:
                    best_score = score
        return best_score


print("Computer goes first! Good luck.")
print("Positions are as follow:")
print("1, 2, 3 ")
print("4, 5, 6 ")
print("7, 8, 9 ")
print("\n")


while not check_win():
    user_move()
    bot_move()



